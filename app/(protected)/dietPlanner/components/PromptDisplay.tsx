"use client";

import { DietPlan } from "@/types/diet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Loader2, 
  LineChart, 
  UtensilsCrossed, 
  ClipboardList,
  Droplets,
  Clock,
  Globe
} from "lucide-react";

interface PromptDisplayProps {
  dietPlan: DietPlan | null;
  isGenerating: boolean;
}

export function PromptDisplay({ dietPlan, isGenerating }: PromptDisplayProps) {
  if (isGenerating) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-500" />
          <p className="text-sm text-gray-500">Generating your diet plan...</p>
        </div>
      </div>
    );
  }

  if (!dietPlan) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 text-center">
        <ClipboardList className="h-12 w-12 text-gray-700 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Ready to create your personalized diet plan?
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          Fill in your details on the left and click &apos;Generate Diet Plan&apos; to receive a customized nutrition plan tailored to your goals and preferences.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Daily Overview Card */}
      <Card className="shadow-sm p-0">
        <CardHeader className="border-b border-gray-200 px-4 py-3">
          <CardTitle className="text-base font-medium flex gap-2 items-center text-gray-700">
            <LineChart className="h-4 w-4 text-gray-700" />Daily Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-4">
          <div className="grid gap-4">
            <div>
              <p className="text-base font-medium text-gray-700">
                {dietPlan.dailyCalories} calories/day
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Protein</p>
                <p className="text-sm font-medium text-gray-700">{dietPlan.macronutrients.protein}%</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Carbs</p>
                <p className="text-sm font-medium text-gray-700">{dietPlan.macronutrients.carbs}%</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Fats</p>
                <p className="text-sm font-medium text-gray-700">{dietPlan.macronutrients.fats}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals Cards */}
      {dietPlan.meals.map((meal, index) => (
        <Card key={index} className="shadow-sm p-0">
          <CardHeader className="border-b border-gray-200 px-4 py-3">
            <CardTitle className="text-base font-medium flex gap-2 items-center text-gray-700">
              <UtensilsCrossed className="h-4 w-4 text-gray-700" />{meal.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 py-4">
            <div className="space-y-4">
              {/* Food Items */}
              <div className="space-y-2">
                {meal.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-between items-center py-2 border-b last:border-0"
                  >
                    <span className="text-sm font-medium text-gray-700">{item.food}</span>
                    <span className="text-xs text-gray-500">{item.portion}</span>
                  </div>
                ))}
              </div>

              {/* Meal Nutrition */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="text-sm font-medium text-gray-700">{meal.nutrition.calories}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Protein</p>
                  <p className="text-sm font-medium text-gray-700">{meal.nutrition.protein}g</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Carbs</p>
                  <p className="text-sm font-medium text-gray-700">{meal.nutrition.carbs}g</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Fats</p>
                  <p className="text-sm font-medium text-gray-700">{meal.nutrition.fats}g</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Additional Notes Card */}
      <Card className="shadow-sm p-0">
        <CardHeader className="border-b border-gray-200 px-4 py-3">
          <CardTitle className="text-base font-medium flex gap-2 items-center text-gray-700">
            <ClipboardList className="h-4 w-4 text-gray-700" />Additional Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-4">
          <div className="space-y-4">
            <div className="flex gap-2 items-start">
              <Droplets className="h-4 w-4 text-gray-700 mt-1" />
              <div>
                <h4 className="text-sm font-medium mb-1 text-gray-700">Hydration</h4>
                <p className="text-xs text-gray-500">
                  {dietPlan.additionalNotes.hydration}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <Clock className="h-4 w-4 text-gray-700 mt-1" />
              <div>
                <h4 className="text-sm font-medium mb-1 text-gray-700">Timing</h4>
                <p className="text-xs text-gray-500">
                  {dietPlan.additionalNotes.timing}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <Globe className="h-4 w-4 text-gray-700 mt-1" />
              <div>
                <h4 className="text-sm font-medium mb-1 text-gray-700">Cultural Considerations</h4>
                <p className="text-xs text-gray-500">
                  {dietPlan.additionalNotes.culturalConsiderations}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 