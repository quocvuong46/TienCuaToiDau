import { useState, useCallback } from "react";
import { createClient } from "./supabase/client";

interface UploadInput {
  file: File;
}

interface UploadResult {
  url?: string;
  error?: string;
}

export function useUpload(): [
  (input: UploadInput) => Promise<UploadResult>,
  { loading: boolean }
] {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const upload = useCallback(
    async (input: UploadInput): Promise<UploadResult> => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error("Người dùng chưa đăng nhập hoặc phiên làm việc đã hết hạn");
        }

        const fileExt = input.file.name.split(".").pop();
        const fileName = `receipt-${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from("receipts")
          .upload(filePath, input.file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Generate a 7-day signed URL for the uploaded file
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from("receipts")
            .createSignedUrl(data.path, 60 * 60 * 24 * 7);

        if (signedUrlError) {
          throw signedUrlError;
        }

        return { url: signedUrlData.signedUrl };
      } catch (err: any) {
        console.error("Upload error:", err);
        return { error: err.message || "Không thể tải lên file" };
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  return [upload, { loading }];
}

export default useUpload;
