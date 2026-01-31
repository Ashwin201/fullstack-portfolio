import cloudinary from "cloudinary";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Configure Cloudinary with environment variables
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Function to remove image from Cloudinary
const removeImage = async (publicId: string): Promise<void> => {
  try {
    const res = await cloudinary.v2.uploader.destroy(publicId);
    // console.log("image removed");
  } catch (error) {
    console.log("Error1:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    // Handle both string and object formats
    const publicId = typeof body === 'string' ? body : body.publicId || body;
    
    if (!publicId) {
      return NextResponse.json(
        { message: "Public ID is required" },
        { status: 400 }
      );
    }
    
    await removeImage(publicId);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log("Error2:", error);
    return NextResponse.json(
      { message: "Failed to remove image" },
      { status: 400 }
    );
  }
}
