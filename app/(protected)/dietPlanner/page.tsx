"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DietFilters } from "./components/DietFilters";
import { PromptDisplay } from "./components/PromptDisplay";
import { Output } from "./components/Output";

export default function DietPlanner() {
  const [formData, setFormData] = useState({
    country: "Sri Lanka",
    weight: "60",
    height: "150",
    age: "20",
    goal: "weight loss",
    meals: "3",
    allergies: "",
  });

  const [completion, setCompletion] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePromptText = (data: typeof formData) => {
    let promptText = `Create me a diet plan using ${data.country} food. my weight is ${data.weight} and height is ${data.height} in cm. I am ${data.age} years old. create me diet plan to achive my goal of ${data.goal}. Number of meals I can take is ${data.meals}.`;

    if (data.allergies.trim()) {
      promptText += `\nPlease avoid these foods due to allergies: ${data.allergies}`;
    }

    promptText += `\n\nPlease format the response as follows:
1. Daily Caloric Target: [calculate based on metrics and goal]
2. Macronutrient Distribution:
   - Protein: X%
   - Carbs: X%
   - Fats: X%

3. Meal Plan:
[For each meal 1-${data.meals}]:
Meal #: [Name of meal]
- [Food item 1] - [portion]
- [Food item 2] - [portion]
(etc.)
Calories: X
Protein: Xg | Carbs: Xg | Fats: Xg

4. Additional Notes:
- Hydration recommendation
- Timing between meals
- Any specific cultural considerations`;

    return promptText;
  };

  const currentPrompt = generatePromptText(formData);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/diet-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
        setCompletion(result);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 px-4 py-2 bg-white flex items-center h-auto border-b border-gray-200">
        <Button
          onClick={() => setShowPrompt(!showPrompt)}
          variant="outline"
          size="sm"
        >
          {showPrompt ? "View Assistant" : "View Prompt"}
        </Button>
      </div>
      <main className="grid grid-cols-2 h-[calc(100vh-49px)]">
        <div className="h-full overflow-auto border-r border-gray-200">
          {!showPrompt ? (
            <div className="flex flex-col justify-between h-full">
              <div className="px-4 py-4">
                <DietFilters formData={formData} setFormData={setFormData} />
              </div>
              <div className="flex bg-white px-4 py-4 border-t border-gray-200">
                <Button 
                  onClick={handleGenerate} 
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Diet Plan"}
                </Button>
              </div>
            </div>
          ) : (
            <PromptDisplay prompt={currentPrompt} />
          )}
        </div>
        <div className="px-4 py-4 h-[calc(100vh-49px)]">
          <div className="border border-gray-200 rounded-lg bg-white overflow-auto h-full">
            <Output completion={completion} />
          </div>
        </div>
      </main>
    </div>
  );
}
