import { getAllMediaByCategory } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mediaData = await getAllMediaByCategory();
    return NextResponse.json(mediaData);
  } catch (error) {
    console.error("❌ API Route: Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}
