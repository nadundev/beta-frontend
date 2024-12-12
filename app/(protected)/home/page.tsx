"use client";

import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { countries } from "countries-list";

export default function Home() {
  const [formData, setFormData] = useState({
    country: "Sri Lanka",
    weight: "60",
    height: "150",
    age: "20",
    goal: "weight loss",
    meals: "3",
  });

  const [completion, setCompletion] = useState("");
  const [prompt, setPrompt] = useState<string>("");

  const handleGenerate = async () => {
    const promptText = `Create me a diet plan using ${formData.country} food. my weight is ${formData.weight} and height is ${formData.height} in cm. I am ${formData.age} years old. create me diet plan to achive my goal of ${formData.goal}. Number of meals I can take is ${formData.meals}.

Please format the response as follows:
1. Daily Caloric Target: [calculate based on metrics and goal]
2. Macronutrient Distribution:
   - Protein: X%
   - Carbs: X%
   - Fats: X%

3. Meal Plan:
[For each meal 1-${formData.meals}]:
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

    setPrompt(promptText);

    try {
      const response = await fetch("/api/diet-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText }),
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
    }
  };

  // Convert countries object to array for select
  const countryOptions = Object.entries(countries)
    .map(([code, country]) => ({
      value: country.name,
      label: country.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Generate weight options from 20 to 180
  const weightOptions = Array.from({ length: 161 }, (_, i) => ({
    value: String(i + 20),
    label: `${i + 20} kg`,
  }));

  // Add meals options
  const mealOptions = Array.from({ length: 9 }, (_, i) => ({
    value: String(i + 2),
    label: `${i + 2} meals`,
  }));

  // Add this function to generate prompt text
  const generatePromptText = (data: typeof formData) => {
    return `Create me a diet plan using ${data.country} food. my weight is ${data.weight} and height is ${data.height} in cm. I am ${data.age} years old. create me diet plan to achive my goal of ${data.goal}. Number of meals I can take is ${data.meals}.

Please format the response as follows:
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
  };

  // Show prompt immediately and update it when form changes
  const currentPrompt = generatePromptText(formData);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Diet Plan Generator</h1>
            </div>
            <div className="flex items-center">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <Select
                  value={formData.country}
                  onValueChange={(value) =>
                    setFormData({ ...formData, country: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <Select
                  value={formData.weight}
                  onValueChange={(value) =>
                    setFormData({ ...formData, weight: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    {weightOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Height (cm)
                </label>
                <Input
                  type="number"
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Goal
                </label>
                <Select
                  value={formData.goal}
                  onValueChange={(value) =>
                    setFormData({ ...formData, goal: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight loss">Weight Loss</SelectItem>
                    <SelectItem value="weight gain">Weight Gain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Meals
                </label>
                <Select
                  value={formData.meals}
                  onValueChange={(value) =>
                    setFormData({ ...formData, meals: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of meals" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleGenerate} className="w-full">
              Generate Diet Plan
            </Button>
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border bg-gray-50 p-4">
                <h3 className="mb-2 font-medium">Prompt:</h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-600">
                  {currentPrompt}
                </pre>
              </div>
              {completion && (
                <div className="rounded-lg border bg-white p-4">
                  <pre className="whitespace-pre-wrap">{completion}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
