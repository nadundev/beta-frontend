export interface DietPlan {
  dailyCalories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: Array<{
    name: string;
    items: Array<{
      food: string;
      portion: string;
    }>;
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    };
  }>;
  additionalNotes: {
    hydration: string;
    timing: string;
    culturalConsiderations: string;
  };
}

export interface DietFormData {
  country: string;
  weight: string;
  height: string;
  age: string;
  goal: string;
  meals: string;
  allergies: string;
  activityLevel: string;
}
