import { createClient } from "@/utils/supabase/server";

interface UploadOptions {
  url?: string;
  buffer?: Buffer;
  base64?: string;
}

export async function upload({ url, buffer, base64 }: UploadOptions) {
  try {
    const supabase = createClient();
    let fileBuffer: Buffer | null = null;
    let fileName = `receipt-${Date.now()}`;
    let contentType = "application/octet-stream";

    if (buffer) {
      fileBuffer = buffer;
    } else if (base64) {
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      fileBuffer = Buffer.from(base64Data, "base64");
      contentType = "image/png";
      fileName += ".png";
    } else if (url) {
      const res = await fetch(url);
      if (res.ok) {
        const arrBuffer = await res.arrayBuffer();
        fileBuffer = Buffer.from(arrBuffer);
        contentType = res.headers.get("content-type") || "image/png";
        fileName += ".png";
      }
    }

    if (!fileBuffer) {
      throw new Error("No valid file data provided for upload");
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const filePath = `${user.id}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("receipts")
      .upload(filePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      throw error;
    }

    // Get Signed URL or Public URL
    const { data: signedData, error: signedError } = await supabase.storage
      .from("receipts")
      .createSignedUrl(data.path, 60 * 60 * 24 * 7); // 7 days

    if (signedError) {
      throw signedError;
    }

    return {
      url: signedData.signedUrl,
      mimeType: contentType,
    };
  } catch (err) {
    console.error("Upload helper error:", err);
    throw err;
  }
}

export default upload;
