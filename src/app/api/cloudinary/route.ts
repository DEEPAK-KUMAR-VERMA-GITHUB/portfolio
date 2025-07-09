import { NextResponse } from 'next/server';
import { deleteFromCloudinary, getPublicIdWithSplittingURL } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    let { publicId } = await req.json();
    if (!publicId) {
      return NextResponse.json({ error: 'publicId is required' }, { status: 400 });
    }
    if (publicId.startsWith('https://res.cloudinary.com/')) {
      publicId = getPublicIdWithSplittingURL(publicId);
    }

    const result = await deleteFromCloudinary(publicId);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Error deleting from Cloudinary:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete from Cloudinary' }, { status: 500 });
  }
}
