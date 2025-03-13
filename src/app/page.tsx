'use client';

import { useState } from 'react';
import RecipeDisplay from '@/components/RecipeDisplay';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [loadingStage, setLoadingStage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setRecipe(null);
    
    try {
      // Basic URL validation
      const url = new URL(videoUrl);
      const hostname = url.hostname.toLowerCase();
      
      if (!hostname.includes('youtube.com') && 
          !hostname.includes('youtu.be') && 
          !hostname.includes('tiktok.com') && 
          !hostname.includes('instagram.com')) {
        throw new Error('Please enter a valid YouTube, TikTok, or Instagram URL');
      }

      setLoadingStage('Fetching video information...');
      const response = await fetch('/api/extract-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract recipe');
      }
      
      setLoadingStage('Processing recipe...');
      setRecipe(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to extract recipe');
    } finally {
      setIsLoading(false);
      setLoadingStage('');
    }
  };

  const handleRetry = () => {
    setError('');
    handleSubmit(new Event('submit') as any);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Recipe Extractor
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Transform your favorite social media recipe videos into easy-to-follow text instructions
            </p>
          </div>

          {/* URL Input Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="videoUrl" className="block text-white text-lg mb-2">
                  Paste your video URL
                </label>
                <input
                  type="url"
                  id="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or TikTok/Instagram URL"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
              </div>
              {error && (
                <div className="bg-red-500/20 rounded-lg p-4 text-white">
                  <p className="text-sm font-medium mb-2">{error}</p>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="text-sm text-white/80 hover:text-white underline"
                  >
                    Try again
                  </button>
                </div>
              )}
              {loadingStage && (
                <div className="text-white/80 text-sm text-center animate-pulse">
                  {loadingStage}
                </div>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Extracting...' : 'Extract Recipe'}
                </button>
              </div>
            </form>
          </div>

          {/* Recipe Display */}
          <RecipeDisplay recipe={recipe} isLoading={isLoading} />

          {/* Supported Platforms */}
          <div className="mt-12 text-center">
            <p className="text-white/70 text-sm mb-4">Supported Platforms</p>
            <div className="flex justify-center space-x-8">
              <div className="text-white/90">YouTube</div>
              <div className="text-white/90">TikTok</div>
              <div className="text-white/90">Instagram</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
