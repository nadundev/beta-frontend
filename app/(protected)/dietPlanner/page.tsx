"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DietFilters } from "./components/DietFilters";
import { PromptDisplay } from "./components/PromptDisplay";
import { DietPlan, DietFormData } from "@/types/diet";
import { Download } from "lucide-react";
import { DownloadDialog } from "./components/DownloadDialog";

export default function DietPlanner() {
  const [formData, setFormData] = useState<DietFormData>({
    country: "Sri Lanka",
    weight: "60",
    height: "150",
    age: "20",
    goal: "weight loss",
    meals: "3",
    allergies: "",
    activityLevel: "moderate",
  });

  const [showPrompt, setShowPrompt] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const generatePromptText = (data: typeof formData) => {
    return `Create me a diet plan using ${data.country} food. my weight is ${data.weight} and height is ${data.height} in cm. I am ${data.age} years old. My activity level is ${data.activityLevel} (${getActivityDescription(data.activityLevel)}). Create me diet plan to achieve my goal of ${data.goal}. Number of meals I can take is ${data.meals}.
    ${data.allergies.trim() ? `\nPlease avoid these foods due to allergies: ${data.allergies}` : ''}

    Consider my activity level when calculating daily caloric needs. Adjust macronutrients based on both my goal and activity level.

    Please provide the response in the following JSON format:
    {
      "dailyCalories": number,
      "macronutrients": {
        "protein": number (percentage),
        "carbs": number (percentage),
        "fats": number (percentage)
      },
      "meals": [
        {
          "name": string,
          "items": [
            {
              "food": string,
              "portion": string
            }
          ],
          "nutrition": {
            "calories": number,
            "protein": number (grams),
            "carbs": number (grams),
            "fats": number (grams)
          }
        }
      ],
      "additionalNotes": {
        "hydration": string,
        "timing": string,
        "culturalConsiderations": string
      }
    }`;
  };

  const getActivityDescription = (level: string): string => {
    const descriptions = {
      sedentary: "Little to no exercise",
      light: "Exercise 1-3 times/week",
      moderate: "Exercise 3-5 times/week",
      active: "Exercise 6-7 times/week",
      very_active: "Exercise multiple times/day",
    };
    return descriptions[level as keyof typeof descriptions] || level;
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
        const chunk = decoder.decode(value);
        result += chunk;
      }

      // Parse the JSON response
      try {
        const parsedPlan = JSON.parse(result) as DietPlan;
        setDietPlan(parsedPlan);
      } catch (error) {
        console.error("Failed to parse diet plan JSON:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 px-4 py-2 bg-white flex items-center h-auto border-b border-gray-200 gap-2">
        <Button
          onClick={() => setShowPrompt(!showPrompt)}
          variant="outline"
          size="sm"
        >
          {showPrompt ? "View Assistant" : "View Prompt"}
        </Button>
        {dietPlan && (
          <Button
            onClick={() => setShowDownloadDialog(true)}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download Plan
          </Button>
        )}
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
            <PromptDisplay dietPlan={null} isGenerating={false} />
          )}
        </div>
        <div className="h-[calc(100vh-49px)] overflow-auto">
            <PromptDisplay dietPlan={dietPlan} isGenerating={isGenerating} />
        </div>
      </main>
      
      {dietPlan && (
        <DownloadDialog
          open={showDownloadDialog}
          onOpenChange={setShowDownloadDialog}
          dietPlan={dietPlan}
        />
      )}
    </div>
  );
}
