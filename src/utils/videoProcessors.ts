import youtubeDl from 'youtube-dl-exec';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface VideoInfo {
  title: string;
  description: string;
  captions?: string;
}

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  source?: string;
}

interface YouTubeOutput {
  title?: string;
  description?: string;
  subtitles?: {
    en?: Array<{ data?: string }>;
  };
}

export async function extractYouTubeInfo(url: string): Promise<VideoInfo> {
  try {
    const output = await youtubeDl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      callHome: false,
      noCheckCertificates: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    }) as YouTubeOutput;

    return {
      title: output.title || 'Untitled Recipe',
      description: output.description || '',
      captions: output.subtitles?.en?.[0]?.data || '',
    };
  } catch (error) {
    console.error('Error extracting YouTube info:', error);
    throw new Error('Failed to extract video information from YouTube');
  }
}

export async function extractRecipeFromText(videoInfo: VideoInfo): Promise<Recipe> {
  try {
    const prompt = `
      Extract a recipe from the following video information:
      Title: ${videoInfo.title}
      Description: ${videoInfo.description}
      ${videoInfo.captions ? `Captions: ${videoInfo.captions}` : ''}

      Please format the recipe as follows:
      1. Title of the dish
      2. List of ingredients with measurements
      3. Step-by-step instructions
      
      If this doesn't appear to be a recipe video, please indicate that no recipe was found.
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts recipe information from video content. Format recipes clearly with a title, ingredients list, and numbered instructions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const recipeText = completion.choices[0]?.message?.content;
    if (!recipeText) {
      throw new Error('No recipe content generated');
    }
    
    // Parse the AI response into structured data
    const lines = recipeText.split('\n').filter(line => line.trim());
    const recipe: Recipe = {
      title: lines[0] || videoInfo.title,
      ingredients: [],
      instructions: [],
    };

    let section = 'none';
    for (const line of lines) {
      if (line.toLowerCase().includes('ingredients:')) {
        section = 'ingredients';
        continue;
      } else if (line.toLowerCase().includes('instructions:')) {
        section = 'instructions';
        continue;
      }

      const cleanedLine = line.trim();
      if (section === 'ingredients' && cleanedLine) {
        recipe.ingredients.push(cleanedLine.replace(/^[-•*]\s*/, ''));
      } else if (section === 'instructions' && cleanedLine) {
        recipe.instructions.push(cleanedLine.replace(/^\d+\.\s*/, ''));
      }
    }

    return recipe;
  } catch (error) {
    console.error('Error extracting recipe from text:', error);
    throw new Error('Failed to extract recipe from video content');
  }
}

// TikTok and Instagram handlers will be implemented later
export async function extractTikTokInfo(url: string): Promise<VideoInfo> {
  throw new Error('TikTok video processing not implemented yet');
}

export async function extractInstagramInfo(url: string): Promise<VideoInfo> {
  throw new Error('Instagram video processing not implemented yet');
} 