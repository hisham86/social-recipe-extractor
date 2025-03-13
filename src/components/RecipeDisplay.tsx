interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  source?: string;
}

interface RecipeDisplayProps {
  recipe: Recipe | null;
  isLoading: boolean;
}

export default function RecipeDisplay({ recipe, isLoading }: RecipeDisplayProps) {
  const copyToClipboard = async () => {
    if (!recipe) return;

    const recipeText = `
${recipe.title}

Ingredients:
${recipe.ingredients.map(i => `- ${i}`).join('\n')}

Instructions:
${recipe.instructions.map((i, index) => `${index + 1}. ${i}`).join('\n')}

Source: ${recipe.source}
    `.trim();

    try {
      await navigator.clipboard.writeText(recipeText);
      // You might want to add a toast notification here
      console.log('Recipe copied to clipboard');
    } catch (err) {
      console.error('Failed to copy recipe:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/20 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
            <div className="h-4 bg-white/20 rounded w-2/3"></div>
            <div className="h-4 bg-white/20 rounded w-1/3"></div>
          </div>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl text-white">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">{recipe.title}</h2>
        <button
          onClick={copyToClipboard}
          className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          title="Copy recipe to clipboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </button>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
        <ul className="list-disc list-inside space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-white/90">{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Instructions</h3>
        <ol className="list-decimal list-inside space-y-4">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="text-white/90">
              <span className="ml-2">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 pt-6 border-t border-white/20">
        <p className="text-white/70 text-sm">
          Source: <a href={recipe.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{recipe.source}</a>
        </p>
      </div>
    </div>
  );
} 