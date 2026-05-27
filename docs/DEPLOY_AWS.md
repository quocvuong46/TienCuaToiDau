# Hướng dẫn triển khai lên AWS EC2 / VPS

> Tài liệu này hướng dẫn deploy ứng dụng **Tiền Của Tôi Đâu** lên AWS EC2 Ubuntu hoặc VPS bất kỳ chạy Ubuntu 22.04+.

---

## 1) Chuẩn bị EC2 Instance

### Khởi tạo trên AWS Console

1. Đăng nhập AWS Console → **EC2** → **Launch instance**
2. **Name**: `tien-cua-toi-dau-prod`
3. **AMI**: Ubuntu Server 22.04 LTS (HVM), SSD
4. **Instance type**: `t3.small` (2 vCPU, 2 GB RAM) — đủ cho ứng dụng nhỏ
5. **Key pair**: tạo mới hoặc dùng key sẵn có, tải `.pem` về
6. **Network settings**:
   - Allow SSH (port 22) từ My IP
   - Allow HTTP (port 80) từ Anywhere
   - Allow HTTPS (port 443) từ Anywhere
7. **Storage**: 20 GB gp3
8. Bấm **Launch**

### SSH vào instance

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

---

## 2) Cài đặt Docker + Docker Compose

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Run docker without sudo
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
docker compose version
```

---

## 3) Clone repo và cấu hình

```bash
# Cài git
sudo apt install -y git

# Clone
git clone https://github.com/your-name/tien-cua-toi-dau.git
cd tien-cua-toi-dau

# Tạo file .env từ template
cp .env.example .env
nano .env
# Điền các giá trị thật: Supabase URL, Anon Key, Service Role Key, Gemini API Key, App URL
```

---

## 4) Build và chạy Docker Compose

```bash
docker compose up -d --build

# Kiểm tra logs
docker compose logs -f app

# Kiểm tra container đang chạy
docker ps
```

App đang chạy tại `http://<EC2_PUBLIC_IP>:3000` — nhưng để dùng port 80/443 cần Nginx.

---

## 5) Cài Nginx reverse proxy

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Tạo file config:

```bash
sudo nano /etc/nginx/sites-available/tiencuatoidau
```

Paste nội dung:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
    }
}
```

Activate config:

```bash
sudo ln -s /etc/nginx/sites-available/tiencuatoidau /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6) Trỏ domain về EC2

Tại nhà cung cấp domain (Namecheap, GoDaddy, Cloudflare...):

| Type | Host | Value | TTL |
|---|---|---|---|
| A | @ | `<EC2_PUBLIC_IP>` | 300 |
| A | www | `<EC2_PUBLIC_IP>` | 300 |

Đợi 5-30 phút để DNS propagate. Test:

```bash
nslookup yourdomain.com
# hoặc
dig +short yourdomain.com
```

---

## 7) Cài SSL bằng Certbot (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx

sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Khi được hỏi: nhập email + đồng ý ToS + chọn redirect HTTP → HTTPS (option 2)
```

Certbot tự config Nginx và auto-renew. Kiểm tra:

```bash
sudo certbot renew --dry-run
```

---

## 8) Sử dụng Cloudflare (tùy chọn — khuyến nghị)

1. Đăng ký Cloudflare → thêm domain → đổi nameserver tại nhà cung cấp domain
2. Tại Cloudflare DNS: thêm A record trỏ về EC2 IP, bật proxy (orange cloud)
3. **SSL/TLS → Full (strict)**
4. **Edge Certificates → Always Use HTTPS: ON**
5. Cloudflare cho free CDN + WAF + DDoS protection

---

## 9) Kiểm tra app production

- Mở https://yourdomain.com → landing page hiện ra
- Đăng ký tài khoản → vào dashboard
- Test OCR hóa đơn → xem có hoạt động không
- Kiểm tra logs nếu có lỗi:

```bash
docker compose logs -f app
sudo journalctl -u nginx -f
```

---

## 10) Auto-deploy với GitHub Actions (tùy chọn)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to EC2
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: SSH and deploy
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/tien-cua-toi-dau
            git pull origin main
            docker compose up -d --build
            docker image prune -f
```

Add secrets vào GitHub repo:
- `EC2_HOST`: IP EC2
- `EC2_SSH_KEY`: nội dung file `.pem`

---

## 11) Monitoring & Backup

### Disk space
```bash
df -h
docker system df
docker system prune -a   # cleanup
```

### Auto-restart container khi crash
Đã có `restart: unless-stopped` trong docker-compose.

### Backup Supabase (chạy hàng tuần)
```bash
crontab -e
# Thêm dòng:
0 2 * * 0 supabase db dump -f /home/ubuntu/backups/db-$(date +\%Y\%m\%d).sql
```

---

## Troubleshooting

| Vấn đề | Cách fix |
|---|---|
| `502 Bad Gateway` | Container app crash. `docker compose logs app` |
| `Certbot fail` | Kiểm tra DNS đã trỏ về EC2 chưa |
| Hết disk | `docker system prune -a` |
| App chậm | Upgrade EC2 lên t3.medium |
| CORS error | Kiểm tra `Site URL` ở Supabase Auth |

---

## Chi phí ước tính

| Hạng mục | Cost/tháng |
|---|---|
| EC2 t3.small | ~$15 |
| Storage 20GB gp3 | ~$2 |
| Bandwidth 100GB out | ~$9 |
| Supabase Free | $0 |
| Gemini Free tier | $0 |
| Cloudflare Free | $0 |
| Domain (.com) | ~$1 (annual) |
| **Tổng** | **~$26/tháng** |
