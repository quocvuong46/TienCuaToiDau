-- ======================================================
-- 1. DROP EXISTING TABLES (IF ANY) TO ENABLE RE-RUNS
-- ======================================================
-- Disable triggers/foreign keys during setup to avoid insertion order constraint violations
SET session_replication_role = 'replica';

DROP TABLE IF EXISTS receipt_items CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS budgets CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS wallets CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS saving_goals CASCADE;
DROP TABLE IF EXISTS ai_prompt_logs CASCADE;

-- ======================================================
-- 2. CREATE TABLE SCHEMAS
-- ======================================================

-- Table: profiles
CREATE TABLE profiles (
  id uuid NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Table: categories
CREATE TABLE categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  icon text DEFAULT 'Tag'::text,
  color text DEFAULT '#FFD100'::text,
  type text NOT NULL DEFAULT 'expense'::text,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Table: wallets
CREATE TABLE wallets (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  type text DEFAULT 'cash'::text,
  icon text DEFAULT 'Wallet'::text,
  color text DEFAULT '#FFD100'::text,
  initial_balance numeric DEFAULT 0,
  current_balance numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Table: budgets
CREATE TABLE budgets (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  category_id uuid,
  month integer NOT NULL,
  year integer NOT NULL,
  limit_amount numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Table: transactions
CREATE TABLE transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  wallet_id uuid,
  category_id uuid,
  amount numeric NOT NULL,
  type text NOT NULL,
  description text,
  merchant_name text,
  image_url text,
  transaction_date date NOT NULL DEFAULT CURRENT_DATE,
  ocr_confidence numeric,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (wallet_id) REFERENCES wallets(id)
);

-- Table: receipt_items
CREATE TABLE receipt_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  transaction_id uuid NOT NULL,
  name text,
  quantity numeric DEFAULT 1,
  price numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);

-- Table: saving_goals
CREATE TABLE saving_goals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  target_amount numeric NOT NULL,
  current_amount numeric DEFAULT 0,
  deadline date,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Table: ai_prompt_logs
CREATE TABLE ai_prompt_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  feature text,
  prompt text,
  result_summary text,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- ======================================================
-- 3. INSERT SAMPLE / SEED DATA
-- ======================================================

-- Data for profiles
INSERT INTO profiles (id, full_name, avatar_url, created_at) VALUES 
('38415869-80c1-4a07-a1f6-7b0339d53c22', 'Vương', NULL, '2026-05-27T08:05:53.078Z'),
('c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'kaih', NULL, '2026-05-27T08:07:34.833Z'),
('2766ecab-2920-489d-b7ee-a810106ec1ba', 'Kaih', NULL, '2026-05-27T08:26:58.628Z'),
('3645c5e8-6700-426f-a6a9-32622dcf57c2', 'Nam', NULL, '2026-05-27T09:36:54.215Z'),
('c6126f92-5869-4aac-93fc-5fdbe5403918', 'User Test Updated', NULL, '2026-05-27T09:50:35.536Z'),
('15bdc0b8-ffee-4269-8d6a-6cb17e669d4e', 'User Test Fixed Updated', NULL, '2026-05-27T10:09:38.642Z'),
('6031c462-b669-4172-8cf4-2a30004c828a', 'Đỗ Quốc Vương', NULL, '2026-05-29T06:25:02.835Z');

-- Data for categories
INSERT INTO categories (id, user_id, name, icon, color, type, is_default, created_at) VALUES 
('4ecb386a-0470-4523-9c67-96fff01482b9', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Ăn uống', 'UtensilsCrossed', '#FB923C', 'expense', true, '2026-05-27T08:06:00.770Z'),
('2bbe48ba-982e-42de-bed8-1cc42e5dbf65', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Di chuyển', 'Car', '#3B82F6', 'expense', true, '2026-05-27T08:06:00.841Z'),
('1f3ce202-7e28-4aa3-94c1-6b838737a446', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Mua sắm', 'ShoppingBag', '#EC4899', 'expense', true, '2026-05-27T08:06:00.914Z'),
('27cfbb8f-1268-4352-8a7b-c7e025355888', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Hóa đơn', 'Receipt', '#EF4444', 'expense', true, '2026-05-27T08:06:00.983Z'),
('ce25b6cf-7725-459a-be15-972dc1740e57', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Giải trí', 'Film', '#8B5CF6', 'expense', true, '2026-05-27T08:06:01.050Z'),
('93100b29-4012-4308-a99f-48522bdbc601', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Sức khỏe', 'HeartPulse', '#22C55E', 'expense', true, '2026-05-27T08:06:01.125Z'),
('e2b2a3c3-7c75-4f52-8026-cd3f7bac117e', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Giáo dục', 'GraduationCap', '#06B6D4', 'expense', true, '2026-05-27T08:06:01.195Z'),
('77f3b8db-108c-4471-bf6c-988e8982b25b', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Nhà cửa', 'Home', '#F59E0B', 'expense', true, '2026-05-27T08:06:01.266Z'),
('1054e6d5-69d1-47e7-b8ba-f379f138afc5', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Khác', 'Tag', '#D6D6D6', 'expense', true, '2026-05-27T08:06:01.335Z'),
('a9c56c9a-9d31-423b-be58-c1b1eea42a4d', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Lương', 'Banknote', '#FFD100', 'income', true, '2026-05-27T08:06:01.406Z'),
('da41000c-6d41-4738-bee1-97946d16e343', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Thưởng', 'Gift', '#FFEE32', 'income', true, '2026-05-27T08:06:01.474Z'),
('4cf6f008-d0d7-46ac-905f-d093d95badb9', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Đầu tư', 'TrendingUp', '#10B981', 'income', true, '2026-05-27T08:06:01.546Z'),
('86db4704-fef9-4f17-a0fc-e271fc17f807', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'Ăn uống', 'UtensilsCrossed', '#FB923C', 'expense', true, '2026-05-27T08:07:37.322Z'),
('2a8f626a-4f93-461f-b766-33d7a2272179', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'Di chuyển', 'Car', '#3B82F6', 'expense', true, '2026-05-27T08:07:37.424Z'),
('60e4377c-df9b-4bb8-acfb-144f0138b84e', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'Mua sắm', 'ShoppingBag', '#EC4899', 'expense', true, '2026-05-27T08:07:37.524Z'),
('c459f0ac-5d3b-4ab7-8ef3-f140eb0cf308', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'Hóa đơn', 'Receipt', '#EF4444', 'expense', true, '2026-05-27T08:07:37.623Z'),
('acc3ea11-1a17-4795-8209-73e2bd71abcd', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'Giải trí', 'Film', '#8B5CF6', 'expense', true, '2026-05-27T08:07:37.724Z'),
('05a2d045-3598-4d33-88f6-babfe3c145fb', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'Sức khỏe', 'HeartPulse', '#22C55E', 'expense', true, '2026-05-27T08:07:37.824Z'),
('b0f3a4ad-2b72-4314-bc43-0107c5eb9173', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'Giáo dục', 'GraduationCap', '#06B6D4', 'expense', true, '2026-05-27T08:07:37.923Z'),
('9fdfe998-4fce-458f-b124-c980139df263', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'Nhà cửa', 'Home', '#F59E0B', 'expense', true, '2026-05-27T08:07:38.023Z');

-- Data for wallets
INSERT INTO wallets (id, user_id, name, type, icon, color, initial_balance, current_balance, created_at) VALUES 
('a1da3f74-e79c-4232-bc10-5a0295017580', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Tiền mặt', 'cash', 'Wallet', '#FFD100', '0.00', '0.00', '2026-05-27T08:06:01.618Z'),
('a48e0efd-03a5-42d1-8cdb-03947a165aad', '38415869-80c1-4a07-a1f6-7b0339d53c22', 'Ngân hàng', 'bank', 'Landmark', '#3B82F6', '0.00', '0.00', '2026-05-27T08:06:01.691Z'),
('2da53622-d897-405a-a097-59327660bb73', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'Ngân hàng', 'bank', 'Landmark', '#3B82F6', '0.00', '0.00', '2026-05-27T08:07:38.629Z'),
('32d53fd6-4307-4475-a8ba-836f03d6e382', '2766ecab-2920-489d-b7ee-a810106ec1ba', 'Tiền mặt', 'cash', 'Wallet', '#FFD100', '0.00', '0.00', '2026-05-27T08:27:04.017Z'),
('2f8e16e7-0d65-4655-87cc-c2b21d56c36b', '2766ecab-2920-489d-b7ee-a810106ec1ba', 'Ngân hàng', 'bank', 'Landmark', '#3B82F6', '0.00', '0.00', '2026-05-27T08:27:04.017Z'),
('ba48e05c-d6a1-433f-9a69-20a83157a881', '3645c5e8-6700-426f-a6a9-32622dcf57c2', 'Ví MoMo', 'e-wallet', 'Smartphone', '#EC4899', '3000000.00', '1995000.00', '2026-05-27T11:36:34.225Z'),
('dad4115f-9b72-48c4-ac00-f5ac9d0cbc89', '3645c5e8-6700-426f-a6a9-32622dcf57c2', 'Ví Tiền mặt', 'cash', 'Wallet', '#FFD100', '5000000.00', '4275000.00', '2026-05-27T11:36:34.121Z'),
('f5e249e7-5872-45eb-a7fb-ca6fc3eeb875', '3645c5e8-6700-426f-a6a9-32622dcf57c2', 'Techcombank', 'bank', 'CreditCard', '#EF4444', '30000000.00', '49450000.00', '2026-05-27T11:36:34.190Z'),
('fd1cd54c-6027-4866-9872-bcdd613ce352', '6031c462-b669-4172-8cf4-2a30004c828a', 'Tiền mặt', 'cash', 'Wallet', '#FFD100', '0.00', '6151000.00', '2026-05-29T06:25:13.379Z');

-- Data for budgets
INSERT INTO budgets (id, user_id, category_id, month, year, limit_amount, created_at) VALUES 
('c87810a6-ae7e-48ea-bc8c-dd498d3f4e9a', '15bdc0b8-ffee-4269-8d6a-6cb17e669d4e', '4ecb386a-0470-4523-9c67-96fff01482b9', 5, 2026, '2000000.00', '2026-05-27T10:14:14.959Z');

-- Data for saving_goals
INSERT INTO saving_goals (id, user_id, name, target_amount, current_amount, deadline, description, created_at) VALUES 
('185777e3-f29b-4dde-a14b-0926143c047c', 'c6126f92-5869-4aac-93fc-5fdbe5403918', 'Mua laptop', '20000000.00', '0.00', NULL, NULL, '2026-05-27T10:01:12.719Z'),
('b335150a-f448-4ee3-95fa-87503ed129e6', '3645c5e8-6700-426f-a6a9-32622dcf57c2', 'Mua iPhone 17 Pro', '35000000.00', '12000000.00', '2026-12-31T00:00:00.000Z', 'Tiết kiệm mua điện thoại mới', '2026-05-27T11:36:34.401Z');

-- Data for transactions
INSERT INTO transactions (id, user_id, wallet_id, category_id, amount, type, description, merchant_name, image_url, transaction_date, ocr_confidence, created_at, updated_at) VALUES 
('366ddf06-7007-43b5-aaab-a51faf534bcf', '15bdc0b8-ffee-4269-8d6a-6cb17e669d4e', '41cc3598-274c-4f8f-a851-5416fb70215c', 'a9c56c9a-9d31-423b-be58-c1b1eea42a4d', '5000000.00', 'income', 'Thu nhap test', NULL, NULL, '2026-05-27T00:00:00.000Z', NULL, '2026-05-27T10:11:07.122Z', '2026-05-27T10:11:07.122Z'),
('de0da12f-1301-40b3-b0bc-fa1f62225f6f', '3645c5e8-6700-426f-a6a9-32622dcf57c2', 'f5e249e7-5872-45eb-a7fb-ca6fc3eeb875', 'a9c56c9a-9d31-423b-be58-c1b1eea42a4d', '25000000.00', 'income', 'Nhận lương tháng 05', 'Công ty phần mềm', NULL, '2026-05-01T00:00:00.000Z', NULL, '2026-05-27T11:36:34.507Z', '2026-05-27T11:36:34.507Z'),
('21dda656-55eb-4d11-803c-18fdd92af71b', '3645c5e8-6700-426f-a6a9-32622dcf57c2', 'f5e249e7-5872-45eb-a7fb-ca6fc3eeb875', '27cfbb8f-1268-4352-8a7b-c7e025355888', '6000000.00', 'expense', 'Thanh toán tiền thuê nhà', 'Chủ nhà', NULL, '2026-05-02T00:00:00.000Z', NULL, '2026-05-27T11:36:34.586Z', '2026-05-27T11:36:34.586Z');

-- Data for receipt_items
INSERT INTO receipt_items (id, transaction_id, name, quantity, price, created_at) VALUES 
('ac175320-d1fb-4ba2-9fd4-4219b529c305', '366ddf06-7007-43b5-aaab-a51faf534bcf', 'BUN SING', '1.00', '42000.00', '2026-05-29T07:45:35.565Z'),
('90f65d62-5560-464c-bddd-43ac4c9b1569', '366ddf06-7007-43b5-aaab-a51faf534bcf', 'MI GION X CHAY', '1.00', '37000.00', '2026-05-29T07:45:35.637Z');

-- Data for ai_prompt_logs
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, result_summary, created_at) VALUES 
('dc6f8b03-9e31-4160-8554-e9249dea366e', 'c02c6652-f772-4b0b-9351-dd1a1b2352ad', 'ocr_receipt', 'https://vdocduzhjxbbytbtfucf.supabase.co/storage/v1/object/sign/receipts/c02c6652-f772-4b0b-9351-dd1a1b2352ad/receipt-1780039589204.jpg', '{"merchant":"","total":0,"confidence":0.2}', '2026-05-29T07:26:37.416Z');

-- Re-enable triggers/foreign keys
SET session_replication_role = 'origin';
