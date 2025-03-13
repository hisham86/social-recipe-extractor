import { NextResponse } from 'next/server';
import { extractYouTubeInfo, extractTikTokInfo, extractInstagramInfo, extractRecipeFromText } from '@/utils/videoProcessors';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const videoUrl = new URL(url);
    const hostname = videoUrl.hostname.toLowerCase();

    let videoInfo;
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      videoInfo = await extractYouTubeInfo(url);
    } else if (hostname.includes('tiktok.com')) {
      videoInfo = await extractTikTokInfo(url);
    } else if (hostname.includes('instagram.com')) {
      videoInfo = await extractInstagramInfo(url);
    } else {
      return NextResponse.json(
        { error: 'Unsupported video platform' },
        { status: 400 }
      );
    }

    const recipe = await extractRecipeFromText(videoInfo);
    recipe.source = url;

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to extract recipe' },
      { status: 500 }
    );
  }
} 