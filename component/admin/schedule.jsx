import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { supabase } from "../../lib/supabase"; // Adjust the import path as needed
import { useNavigation, useRoute } from '@react-navigation/native';

const exercises = {
  
  Cardio: ["Rowing Machine", "Stationary Bike"],
};

const Schedule = () => {
  const [selectedExercises, setSelectedExercises] = useState({});
  const [exerciseCounts, setExerciseCounts] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [existingSchedule, setExistingSchedule] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params; // Get userId from route parameters

  useEffect(() => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing.");
      navigation.goBack();
    } else {
      fetchSchedule();
    }
  }, [userId]);

  const fetchSchedule = async () => {
    const { data, error } = await supabase
      .from("schedule")
      .select("exercises")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching schedule:", error);
      Alert.alert("Error", "There was an error fetching the schedule.");
    } else if (data && data.length > 0) {
      console.log("Raw data from database:", data[0].exercises); // Log raw data

      // Check if the data is already an object or needs parsing
      try {
        const exercises = typeof data[0].exercises === 'string'
          ? JSON.parse(data[0].exercises)
          : data[0].exercises;

        setExistingSchedule(exercises);
      } catch (err) {
        console.error("Error parsing exercises data:", err);
        Alert.alert("Error", "There was an error parsing the schedule data.");
      }
    } else {
      setExistingSchedule([]);
    }
  };

  const handleExerciseChange = (exercise) => {
    setSelectedExercises((prevSelectedExercises) => ({
      ...prevSelectedExercises,
      [exercise]: !prevSelectedExercises[exercise],
    }));
  };

  const handleCountChange = (exercise, count) => {
    setExerciseCounts((prevExerciseCounts) => ({
      ...prevExerciseCounts,
      [exercise]: count,
    }));
  };

  const handleAddSchedule = async () => {
    if (!userId || Object.keys(selectedExercises).length === 0) {
      Alert.alert("Error", "Please fill out all fields and select at least one exercise.");
      return;
    }

    // Prepare the exercises list with count as varchar
    const exercisesList = Object.keys(selectedExercises)
      .filter(exercise => selectedExercises[exercise])
      .map(exercise => ({
        name: exercise,
        count: exerciseCounts[exercise] ? exerciseCounts[exercise].toString() : "0", // Convert count to string
      }));

    // Clear existing schedule for the user
    const { error: deleteError } = await supabase
      .from("schedule")
      .delete()
      .eq("user_id", userId);

    if (deleteError) {
      console.error("Error deleting previous schedule:", deleteError);
      Alert.alert("Error", "There was an error deleting the previous schedule.");
      return;
    }

    // Insert new schedule
    const { data, error } = await supabase
      .from("schedule")
      .insert({
        user_id: userId,
        exercises: JSON.stringify(exercisesList) // Convert array to JSON string
      });

    if (error) {
      console.error("Error adding schedule:", error);
      Alert.alert("Error", "There was an error adding the schedule.");
    } else {
      console.log("Schedule added:", data);
      Alert.alert("Success", "Schedule added successfully!");
      setSelectedExercises({});
      setExerciseCounts({});
      fetchSchedule(); // Fetch updated schedule
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prevExpandedCategories) => ({
      ...prevExpandedCategories,
      [category]: !prevExpandedCategories[category],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      <View style={styles.workoutSection}>
        {existingSchedule.length > 0 ? (
          existingSchedule.map((exercise, index) => (
            <View key={index} style={styles.scheduleItem}>
              <Text style={styles.scheduleText}>{exercise.name}</Text>
              <Text style={styles.scheduleText}>{exercise.count}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noWorkoutsText}>No workouts scheduled.</Text>
        )}
      </View>
      <Text style={styles.title}>Add a Schedule</Text>
      {Object.keys(exercises).map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => toggleCategory(category)}>
            <Text style={styles.categoryTitle}>{category} Exercises</Text>
          </TouchableOpacity>
          {expandedCategories[category] && exercises[category].map((exercise) => (
            <View key={exercise} style={styles.exerciseContainer}>
              <Checkbox
                status={selectedExercises[exercise] ? "checked" : "unchecked"}
                onPress={() => handleExerciseChange(exercise)}
              />
              <Text style={styles.exerciseLabel}>{exercise}</Text>
              <TextInput
                style={styles.countInput}
                placeholder="How Many"
                value={exerciseCounts[exercise] || ""}
                onChangeText={(count) => handleCountChange(exercise, count)}
                keyboardType="numeric"
              />
            </View>
          ))}
        </View>
      ))}
      <Button title="Add Schedule" onPress={handleAddSchedule} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  workoutSection: {
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  scheduleText: {
    fontSize: 16,
  },
  noWorkoutsText: {
    fontSize: 16,
    color: "gray",
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseLabel: {
    flex: 1,
    marginLeft: 8,
  },
  countInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    width: 60,
  },
});

export default Schedule;
