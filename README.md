# Social Recipe Extractor 🧑‍🍳

A modern web application that extracts recipes from social media cooking videos. Simply paste a YouTube, TikTok, or Instagram video URL, and get a beautifully formatted recipe with ingredients and step-by-step instructions.

![Recipe Extractor Screenshot](public/screenshot.png)

## ✨ Features

- 🎥 Extract recipes from YouTube videos (TikTok and Instagram coming soon)
- 🎨 Modern UI with animated gradient background
- 💫 Beautiful glass-morphism design
- 📋 Copy recipes to clipboard
- 🔄 Loading states with progress indicators
- ⚠️ Error handling with retry options
- 🤖 AI-powered recipe extraction using OpenAI
- 📱 Fully responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- yt-dlp (for YouTube video processing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hisham86/social-recipe-extractor.git
   cd social-recipe-extractor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install yt-dlp (for YouTube video processing):
   ```bash
   # macOS
   brew install yt-dlp

   # Linux
   sudo apt install yt-dlp

   # Windows (using chocolatey)
   choco install yt-dlp
   ```

4. Create a `.env` file in the root directory:
   ```env
   # OpenAI API Key
   OPENAI_API_KEY=your_openai_api_key_here

   # Rate Limiting
   MAX_REQUESTS_PER_MINUTE=10
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key for recipe extraction | Yes | - |
| `MAX_REQUESTS_PER_MINUTE` | Rate limiting for API requests | No | 10 |

## 🏗️ Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [OpenAI API](https://openai.com/) - AI-powered recipe extraction
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - YouTube video processing

## 📝 API Routes

### POST `/api/extract-recipe`

Extract recipe from a video URL.

**Request Body:**
```json
{
  "url": "https://youtube.com/watch?v=..."
}
```

**Response:**
```json
{
  "title": "Recipe Title",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step 1", "step 2"],
  "source": "video_url"
}
```

## 🚧 Upcoming Features

- [ ] TikTok video support
- [ ] Instagram video support
- [ ] Save recipes to favorites
- [ ] Share recipes
- [ ] User authentication
- [ ] Recipe search functionality
- [ ] Multiple language support
- [ ] Dark/Light theme toggle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- yt-dlp for YouTube video processing
- Next.js team for the amazing framework
