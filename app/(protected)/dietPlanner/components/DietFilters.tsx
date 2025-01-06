"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries } from "countries-list";

type FormData = {
  country: string;
  weight: string;
  height: string;
  age: string;
  goal: string;
  meals: string;
  allergies: string;
};

interface DietFiltersProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export function DietFilters({ formData, setFormData }: DietFiltersProps) {
  const countryOptions = Object.values(countries)
    .map((country) => ({
      value: country.name,
      label: country.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const weightOptions = Array.from({ length: 161 }, (_, i) => ({
    value: String(i + 20),
    label: `${i + 20} kg`,
  }));

  const mealOptions = Array.from({ length: 9 }, (_, i) => ({
    value: String(i + 2),
    label: `${i + 2} meals`,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Country Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <Select
          value={formData.country}
          onValueChange={(value) => setFormData({ ...formData, country: value })}
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

      {/* Weight Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
        <Select
          value={formData.weight}
          onValueChange={(value) => setFormData({ ...formData, weight: value })}
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

      {/* Height Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
        <Input
          type="number"
          min="100"
          max="250"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
        />
      </div>

      {/* Age Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <Input
          type="number"
          min="1"
          max="120"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </div>

      {/* Goal Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Goal</label>
        <Select
          value={formData.goal}
          onValueChange={(value) => setFormData({ ...formData, goal: value })}
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

      {/* Meals Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Meals</label>
        <Select
          value={formData.meals}
          onValueChange={(value) => setFormData({ ...formData, meals: value })}
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

      {/* Allergies Textarea */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Food Allergies</label>
        <Textarea
          placeholder="Enter any food allergies (optional)"
          value={formData.allergies}
          onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
} 