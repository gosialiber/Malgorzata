
import React, { useState } from 'react';
import { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-64 md:h-96">
        <img 
          src={`https://picsum.photos/seed/${recipe.recipeName.replace(/\s+/g, '')}/1200/800`} 
          alt={recipe.recipeName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-10">
          <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            {recipe.difficulty}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2 leading-tight">
            {recipe.recipeName}
          </h1>
          <p className="text-stone-200 text-lg max-w-2xl">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:divide-x divide-stone-100">
        {/* Sidebar Info */}
        <div className="p-6 md:p-10 space-y-8 bg-stone-50/50">
          <div>
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                <p className="text-xs text-stone-500">Prep Time</p>
                <p className="font-semibold text-stone-800">{recipe.prepTime}</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                <p className="text-xs text-stone-500">Cook Time</p>
                <p className="font-semibold text-stone-800">{recipe.cookTime}</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                <p className="text-xs text-stone-500">Servings</p>
                <p className="font-semibold text-stone-800">{recipe.servings}</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                <p className="text-xs text-stone-500">Difficulty</p>
                <p className="font-semibold text-stone-800">{recipe.difficulty}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Ingredients</h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex justify-between items-start text-sm border-b border-stone-100 pb-2">
                  <span className="text-stone-800 font-medium">{ing.item}</span>
                  <span className="text-stone-500 font-mono">{ing.amount} {ing.unit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Nutrition per serving</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Calories</span>
                <span className="font-bold text-stone-800">{recipe.nutritionalInfo.calories}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Protein</span>
                <span className="font-bold text-stone-800">{recipe.nutritionalInfo.protein}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Carbs</span>
                <span className="font-bold text-stone-800">{recipe.nutritionalInfo.carbs}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Fat</span>
                <span className="font-bold text-stone-800">{recipe.nutritionalInfo.fat}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 p-6 md:p-10 bg-white">
          <h2 className="text-3xl font-serif text-stone-800 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-xl">🍳</span>
            Instructions
          </h2>
          <div className="space-y-8">
            {recipe.instructions.map((step, i) => (
              <div 
                key={i} 
                className={`flex gap-6 group cursor-pointer transition-all duration-300 ${completedSteps.includes(i) ? 'opacity-40 grayscale' : ''}`}
                onClick={() => toggleStep(i)}
              >
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-colors ${completedSteps.includes(i) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-amber-200 text-amber-600 group-hover:border-amber-500 group-hover:bg-amber-50'}`}>
                    {completedSteps.includes(i) ? '✓' : i + 1}
                  </div>
                </div>
                <div className="pt-2">
                  <p className={`text-stone-700 leading-relaxed text-lg ${completedSteps.includes(i) ? 'line-through' : ''}`}>
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 bg-stone-50 rounded-2xl border border-stone-200 border-dashed text-center">
            <p className="text-stone-500 italic">"Good food is the foundation of genuine happiness."</p>
          </div>
        </div>
      </div>
    </div>
  );
};
