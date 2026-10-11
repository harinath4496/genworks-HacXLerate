import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "genworks_creators";
      const resourceTypeParam = (formData.get("resource_type") as string) || "auto";

      if (!file) {
        return NextResponse.json(
          { success: false, error: "No file provided in form data." },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: resourceTypeParam as "auto" | "image" | "video" | "raw",
            filename_override: file.name,
          },
          (error, res) => {
            if (error) return reject(error);
            if (!res) return reject(new Error("Empty response from Cloudinary."));
            resolve(res);
          }
        );
        uploadStream.end(buffer);
      });

      return NextResponse.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        resourceType: result.resource_type,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
      });
    }

    // JSON upload (e.g. data URI or remote URL)
    const jsonBody = await req.json();
    const { file, folder = "genworks_creators", resourceType = "auto" } = jsonBody;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File string / data URI is required." },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: resourceType as "auto" | "image" | "video" | "raw",
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (err: unknown) {
    console.error("[API Error] /api/upload:", err);
    const msg = err instanceof Error ? err.message : "Cloudinary upload failed.";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
