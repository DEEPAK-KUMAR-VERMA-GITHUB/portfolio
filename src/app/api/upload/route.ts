import { NextResponse } from 'next/server';
import mime from 'mime-types';
import path from 'path';
import fs from 'fs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    console.log(formData);

    const file = formData.get('file') as File;

    console.log(file);

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

    // Generate a unique filename
    const fileExtension = mime.extension(file.type) || '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    // use regex for replace all invalid characters from filename like space, special characters, etc
    const name = file.name.replace(/[^a-zA-Z0-9]/g, '_');

    const filename = `${name}-${uniqueSuffix}.${fileExtension}`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadPath, filename);

    // ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // save the file
    await fs.promises.writeFile(filePath, buffer);

    // return the file url
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
        url: fileUrl,
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
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename as string);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return NextResponse.json({ success: true });
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }

      console.error('Error removing file:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Error removing file:', error);
    return NextResponse.json({ error: error.message || 'Failed to remove file' }, { status: 500 });
  }
}
