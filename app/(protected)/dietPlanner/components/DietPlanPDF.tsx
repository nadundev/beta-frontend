import React from "react";
import { DietPlan } from "@/types/diet";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    color: "#334155", // slate-700
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderBottom: "1 solid #E2E8F0", // slate-200
    paddingBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A", // slate-900
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A", // slate-900
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    backgroundColor: "#F8FAFC", // slate-50
    padding: 8,
    borderRadius: 4,
  },
  overviewItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  overviewLabel: {
    fontSize: 8,
    color: "#64748B", // slate-500
  },
  overviewValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0F172A", // slate-900
  },
  meal: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#F8FAFC", // slate-50
    borderRadius: 4,
    borderLeft: "3 solid #2563EB", // blue-600
  },
  mealTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1E40AF", // blue-800
  },
  item: {
    fontSize: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  nutrition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    padding: 6,
    backgroundColor: "#F0FDF4", // green-50
    borderRadius: 4,
  },
  nutritionItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  nutritionLabel: {
    fontSize: 8,
    color: "#166534", // green-800
  },
  nutritionValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#166534", // green-800
  },
  notes: {
    marginTop: 4,
    fontSize: 8,
    color: "#64748B", // slate-500
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    textAlign: "center",
    color: "#64748B", // slate-500
    borderTop: "1 solid #E2E8F0", // slate-200
    paddingTop: 8,
  },
});

interface OverviewItemProps {
  label: string;
  value: string;
}

const OverviewItem = ({ label, value }: OverviewItemProps) => (
  <View style={styles.overviewItem}>
    <Text style={styles.overviewLabel}>{label}</Text>
    <Text style={styles.overviewValue}>{value}</Text>
  </View>
);

interface NutritionItemProps {
  label: string;
  value: string;
}

const NutritionItem = ({ label, value }: NutritionItemProps) => (
  <View style={styles.nutritionItem}>
    <Text style={styles.nutritionLabel}>{label}</Text>
    <Text style={styles.nutritionValue}>{value}</Text>
  </View>
);

interface DietPlanPDFProps {
  dietPlan: DietPlan;
}

export function DietPlanPDF({ dietPlan }: DietPlanPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            src="/app-logo.svg"
            style={styles.logo}
          />
          <Text style={styles.title}>Your Diet Plan</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Overview</Text>
          </View>
          <View style={styles.overview}>
            <OverviewItem
              label="Daily Calories"
              value={`${dietPlan.dailyCalories} kcal`}
            />
            <OverviewItem
              label="Protein"
              value={`${dietPlan.macronutrients.protein}%`}
            />
            <OverviewItem
              label="Carbs"
              value={`${dietPlan.macronutrients.carbs}%`}
            />
            <OverviewItem
              label="Fats"
              value={`${dietPlan.macronutrients.fats}%`}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meals</Text>
          </View>
          {dietPlan.meals.map((meal, index) => (
            <View key={index} style={styles.meal}>
              <Text style={styles.mealTitle}>{meal.name}</Text>

              {meal.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.item}>
                  <Text>{item.food}</Text>
                  <Text>{item.portion}</Text>
                </View>
              ))}

              <View style={styles.nutrition}>
                <NutritionItem
                  label="Calories"
                  value={`${meal.nutrition.calories} kcal`}
                />
                <NutritionItem
                  label="Protein"
                  value={`${meal.nutrition.protein}g`}
                />
                <NutritionItem
                  label="Carbs"
                  value={`${meal.nutrition.carbs}g`}
                />
                <NutritionItem label="Fats" value={`${meal.nutrition.fats}g`} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Additional Notes</Text>
          </View>
          <Text style={styles.notes}>
            Hydration: {dietPlan.additionalNotes.hydration}
          </Text>
          <Text style={styles.notes}>
            Timing: {dietPlan.additionalNotes.timing}
          </Text>
          <Text style={styles.notes}>
            Cultural Considerations:{" "}
            {dietPlan.additionalNotes.culturalConsiderations}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.notes}>
            This diet plan is personalized based on your specific needs and goals.
            Always consult with a healthcare professional before making
            significant changes to your diet.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
