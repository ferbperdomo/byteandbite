import {
  getAllMediaByCategory,
  getMediaByCategoryWithLimit,
} from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const category = searchParams.get("category");

    // If limit is specified, use the limited function
    if (limit) {
      const limitNumber = parseInt(limit);
      const mediaData = await getMediaByCategoryWithLimit(limitNumber);

      // If category is specified, return only that category
      if (category && mediaData[category as keyof typeof mediaData]) {
        return NextResponse.json({
          media: mediaData[category as keyof typeof mediaData],
        });
      }

      return NextResponse.json(mediaData);
    }

    // Default behavior - get all media (for Gallery)
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
