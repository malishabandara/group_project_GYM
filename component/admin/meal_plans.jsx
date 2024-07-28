import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import supabase from "../../lib/supabase"; // Adjust the path according to your project structure

const Meals = () => {
  const [userId, setUserId] = useState("");
  const [meals, setMeals] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("meal_plans")
      .insert([{ user_id: userId, meals }]);

    if (error) {
      setMessage("Failed to add meal plan.");
      console.error("Error:", error);
    } else {
      setMessage("Meal plan added successfully!");
      setUserId("");
      setMeals("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Meal Plan</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Meals"
        value={meals}
        onChangeText={setMeals}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Meals;
