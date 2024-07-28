import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase"; // Adjust the import path as needed

const MealPlansList = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlans = async () => {
      const { data, error } = await supabase.from("meal_plans").select("user_id, meals");

      if (error) {
        console.error("Error fetching meal plans:", error);
      } else {
        setMealPlans(data);
      }

      setLoading(false);
    };

    fetchMealPlans();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={mealPlans}
      keyExtractor={(item) => item.user_id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.userId}>User ID: {item.user_id}</Text>
          <Text style={styles.meals}>Meals: {item.meals}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userId: {
    fontWeight: "bold",
  },
  meals: {
    marginTop: 4,
  },
});

export default MealPlansList;
