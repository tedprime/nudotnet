import 'server-only';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Inserts Cloudinary's f_auto,q_auto delivery transformation into a secure_url.
 * Without this, an upload stores the file's original format (e.g. HEIC from an
 * iPhone, CMYK JPEG) and Next's image optimizer — which uses sharp, not
 * Cloudinary's decoders — 500s trying to re-process it. f_auto makes Cloudinary
 * transcode to a format the requester can actually decode (and won't strip
 * transparency: it picks PNG/WebP over JPEG when the source has alpha).
 */
export function withAutoFormat(url: string): string {
  if (!url.includes('res.cloudinary.com') || url.includes('/upload/f_auto')) {
    return url;
  }
  return url.replace('/upload/', '/upload/f_auto,q_auto/');
}

/** Uploads an image file to Cloudinary and returns its public HTTPS URL. */
export async function uploadImage(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary upload failed'));
          return;
        }
        resolve(withAutoFormat(result.secure_url));
      }
    );
    stream.end(buffer);
  });
}
