import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  fileName: string,
  resourceType: 'image' | 'raw' = 'image'
): Promise<{ url: string; public_id: string; resource_type: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'portfolio_uploads',
          public_id: fileName,
          resource_type: resourceType,
          transformation: resourceType === 'image' ? [{ quality: 'auto', fetch_format: 'auto' }] : undefined,
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve({ url: result.secure_url, public_id: result.public_id, resource_type: result.resource_type });
        }
      )
      .end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId: string) {
  console.log(publicId);
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
}

export function getPublicIdWithSplittingURL(url: string) {
  const parts = url.split('/upload/');
  if (parts.length < 2) return '';

  let path = parts[1];
  // remove the version number from the path
  path = path.replace(/^v\d+\//, '');

  // remove the file extension
  const lastDotIndex = path.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    path = path.substring(0, lastDotIndex);
  }

  console.log(path);

  return path;
}
