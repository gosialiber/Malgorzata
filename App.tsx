
import React, { useState, useEffect } from 'react';
import { generateRecipe } from './services/geminiService';
import { Recipe } from './types';
import { RecipeDisplay } from './components/RecipeDisplay';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await generateRecipe(searchQuery);
      setRecipe(result);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipe. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Load an initial recipe on mount
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const result = await generateRecipe("Classic Italian Lasagna");
        setRecipe(result);
      } catch (err) {
        setError("Error loading initial recipe.");
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {/* Header / Search Area */}
      <header className="pt-12 pb-24 bg-stone-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            <span className="text-xl">✨</span>
            <span className="text-sm font-medium tracking-wide uppercase">AI Powered Culinary Magic</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 italic">GourmetGenie</h1>
          <p className="text-stone-400 text-lg mb-10 max-w-2xl mx-auto">
            What are you craving today? Enter any dish, and GourmetGenie will craft a perfect recipe just for you.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="e.g., Spicy Thai Basil Chicken, Beef Wellington..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-stone-900 py-4 px-6 pr-32 rounded-2xl shadow-2xl focus:ring-4 focus:ring-amber-500/50 outline-none text-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-stone-900 hover:bg-stone-800 text-white px-6 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="hidden sm:inline">Craft</span>
                  <span className="text-lg">✨</span>
                </>
              )}
            </button>
          </form>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        {error && (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center mb-12 animate-bounce">
            <p className="font-bold mb-2">Oops!</p>
            <p>{error}</p>
          </div>
        )}

        {loading && !recipe && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin"></div>
            <p className="text-stone-500 font-medium animate-pulse">Whispering to the kitchen spirits...</p>
          </div>
        )}

        {recipe && (
          <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
            <RecipeDisplay recipe={recipe} />
          </div>
        )}

        {!recipe && !loading && !error && (
          <div className="text-center py-20 text-stone-400">
            <p className="text-6xl mb-4">🍽️</p>
            <p className="text-xl">Enter a dish above to get started!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-stone-200 pt-10 text-center text-stone-400 text-sm">
        <p>© {new Date().getFullYear()} GourmetGenie AI. Created with passion for gastronomy.</p>
      </footer>
    </div>
  );
};

export default App;
