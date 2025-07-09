import { deleteFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // console.log(formData);

    const file = formData.get('file') as File;

    // console.log(file);

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // validate file type
    const alloedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!alloedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // validate file size
    const maxSize = 1024 * 1024 * 5; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size too large' }, { status: 400 });
    }

    // Generate a unique filename for Cloudinary
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const name = file.name.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${name}-${uniqueSuffix}`;

    // convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type for Cloudinary
    const resourceType = file.type === 'application/pdf' ? 'raw' : 'image';

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, filename, resourceType);

    return NextResponse.json({
      success: true,
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
        url: uploadResult.url,
        cloudinary_public_id: uploadResult.public_id,
      },
    });
  } catch (error: any) {
    console.error('File upload failed:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }
    const result = await deleteFromCloudinary(filename);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Error removing file:', error);
    return NextResponse.json({ error: error.message || 'Failed to remove file' }, { status: 500 });
  }
}
