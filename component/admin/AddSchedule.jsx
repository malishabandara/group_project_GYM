import React, { useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";

const exercises = {
  Chest: [
    "Band-Assisted Bench Press",
    "Bar Dip",
    "Bench Press",
    "Bench Press Against Band",
    "Board Press",
    "Cable Chest Press",
    "Close-Grip Bench Press",
    "Close-Grip Feet-Up Bench Press",
    "Decline Bench Press",
    "Decline Push-Up",
    "Dumbbell Chest Fly",
    "Dumbbell Chest Press",
    "Dumbbell Decline Chest Press",
    "Dumbbell Floor Press",
    "Dumbbell Pullover",
    "Feet-Up Bench Press",
    "Floor Press",
    "Incline Bench Press",
    "Incline Dumbbell Press",
    "Incline Push-Up",
    "Kettlebell Floor Press",
    "Kneeling Incline Push-Up",
    "Kneeling Push-Up",
    "Machine Chest Fly",
    "Machine Chest Press",
    "Pec Deck",
    "Pin Bench Press",
    "Push-Up",
    "Push-Up Against Wall",
    "Push-Ups With Feet in Rings",
    "Resistance Band Chest Fly",
    "Smith Machine Bench Press",
    "Smith Machine Incline Bench Press",
    "Standing Cable Chest Fly",
    "Standing Resistance Band Chest Fly",
  ],
  Shoulders: [
    "Band External Shoulder Rotation",
    "Band Internal Shoulder Rotation",
    "Band Pull-Apart",
    "Barbell Front Raise",
    "Barbell Rear Delt Row",
    "Barbell Upright Row",
    "Behind the Neck Press",
    "Cable Lateral Raise",
    "Cable Rear Delt Row",
    "Dumbbell Front Raise",
    "Dumbbell Horizontal Internal Shoulder Rotation",
    "Dumbbell Horizontal External Shoulder Rotation",
    "Dumbbell Lateral Raise",
    "Dumbbell Rear Delt Row",
    "Dumbbell Shoulder Press",
    "Face Pull",
    "Front Hold",
    "Lying Dumbbell External Shoulder Rotation",
    "Lying Dumbbell Internal Shoulder Rotation",
    "Machine Lateral Raise",
    "Machine Shoulder Press",
    "Monkey Row",
    "Overhead Press",
    "Plate Front Raise",
    "Power Jerk",
    "Push Press",
    "Reverse Cable Flyes",
    "Reverse Dumbbell Flyes",
    "Reverse Machine Fly",
    "Seated Dumbbell Shoulder Press",
    "Seated Barbell Overhead Press",
    "Seated Smith Machine Shoulder Press",
    "Snatch Grip Behind the Neck Press",
    "Squat Jerk",
    "Split Jerk",
  ],
  Biceps: [
    "Barbell Curl",
    "Barbell Preacher Curl",
    "Bodyweight Curl",
    "Cable Curl With Bar",
    "Cable Curl With Rope",
    "Concentration Curl",
    "Dumbbell Curl",
    "Dumbbell Preacher Curl",
    "Hammer Curl",
    "Incline Dumbbell Curl",
    "Machine Bicep Curl",
    "Spider Curl",
  ],
  Triceps: [
    "Barbell Standing Triceps Extension",
    "Barbell Lying Triceps Extension",
    "Bench Dip",
    "Close-Grip Push-Up",
    "Dumbbell Lying Triceps Extension",
    "Dumbbell Standing Triceps Extension",
    "Overhead Cable Triceps Extension",
    "Tricep Bodyweight Extension",
    "Tricep Pushdown With Bar",
    "Tricep Pushdown With Rope",
  ],
  Legs: [
    "Air Squat",
    "Barbell Hack Squat",
    "Barbell Lunge",
    "Barbell Walking Lunge",
    "Belt Squat",
    "Body Weight Lunge",
    "Bodyweight Leg Curl",
    "Box Squat",
    "Bulgarian Split Squat",
    "Chair Squat",
    "Dumbbell Lunge",
    "Dumbbell Squat",
    "Front Squat",
    "Goblet Squat",
    "Hack Squat Machine",
    "Half Air Squat",
    "Hip Adduction Machine",
    "Jumping Lunge",
    "Landmine Hack Squat",
    "Landmine Squat",
    "Leg Curl On Ball",
    "Leg Extension",
    "Leg Press",
    "Lying Leg Curl",
    "Nordic Hamstring Eccentric",
    "Pause Squat",
    "Reverse Barbell Lunge",
    "Romanian Deadlift",
    "Safety Bar Squat",
    "Seated Leg Curl",
    "Shallow Body Weight Lunge",
    "Side Lunges (Bodyweight)",
    "Smith Machine Squat",
    "Squat",
    "Step Up",
    "Zercher Squat",
  ],
  Back: [
    "Assisted Chin-Up",
    "Assisted Pull-Up",
    "Back Extension",
    "Banded Muscle-Up",
    "Barbell Row",
    "Barbell Shrug",
    "Block Clean",
    "Block Snatch",
    "Cable Close Grip Seated Row",
    "Cable Wide Grip Seated Row",
    "Chin-Up",
    "Clean",
    "Clean and Jerk",
    "Deadlift",
    "Deficit Deadlift",
    "Dumbbell Deadlift",
    "Dumbbell Row",
    "Dumbbell Shrug",
    "Floor Back Extension",
    "Good Morning",
    "Hang Clean",
    "Hang Power Clean",
    "Hang Power Snatch",
    "Hang Snatch",
    "Inverted Row",
    "Inverted Row with Underhand Grip",
    "Jefferson Curl",
    "Jumping Muscle-Up",
    "Kettlebell Swing",
    "Lat Pulldown With Pronated Grip",
    "Lat Pulldown With Supinated Grip",
    "Muscle-Up (Bar)",
    "Muscle-Up (Rings)",
    "One-Handed Cable Row",
    "One-Handed Lat Pulldown",
    "Pause Deadlift",
    "Pendlay Row",
    "Power Clean",
    "Power Snatch",
    "Pull-Up",
    "Pull-Up With a Neutral Grip",
    "Rack Pull",
    "Ring Pull-Up",
    "Ring Row",
    "Seal Row",
    "Seated Machine Row",
    "Snatch",
    "Snatch Grip Deadlift",
    "Stiff-Legged Deadlift",
    "Straight Arm Lat Pulldown",
    "Sumo Deadlift",
    "T-Bar Row",
    "Trap Bar Deadlift With High Handles",
    "Trap Bar Deadlift With Low Handles",
  ],
  Glutes: [
    "Banded Side Kicks",
    "Cable Pull Through",
    "Clamshells",
    "Dumbbell Romanian Deadlift",
    "Dumbbell Frog Pumps",
    "Fire Hydrants",
    "Frog Pumps",
    "Glute Bridge",
    "Hip Abduction Against Band",
    "Hip Abduction Machine",
    "Hip Thrust",
    "Hip Thrust Machine",
    "Hip Thrust With Band Around Knees",
    "Lateral Walk With Band",
    "Machine Glute Kickbacks",
    "One-Legged Glute Bridge",
    "One-Legged Hip Thrust",
    "Reverse Hyperextension",
    "Romanian Deadlift",
    "Single Leg Romanian Deadlift",
    "Standing Glute Kickback in Machine",
    "Step Up",
  ],
  Abs: [
    "Ball Slams",
    "Cable Crunch",
    "Crunch",
    "Dead Bug",
    "Hanging Knee Raise",
    "Hanging Leg Raise",
    "Hanging Sit-Up",
    "High to Low Wood Chop with Band",
    "Horizontal Wood Chop with Band",
    "Kneeling Ab Wheel Roll-Out",
    "Kneeling Plank",
    "Kneeling Side Plank",
    "Lying Leg Raise",
    "Lying Windshield Wiper",
    "Lying Windshield Wiper with Bent Knees",
    "Machine Crunch",
    "Mountain Climbers",
    "Oblique Crunch",
    "Oblique Sit-Up",
    "Plank",
    "Plank with Leg Lifts",
    "Side Plank",
    "Sit-Up",
  ],
  Calves: [
    "Barbell Standing Calf Raise",
    "Eccentric Heel Drop",
    "Heel Raise",
    "Seated Calf Raise",
    "Standing Calf Raise",
  ],
  Forearm: [
    "Barbell Wrist Curl",
    "Barbell Wrist Curl Behind the Back",
    "Bar Hang",
    "Dumbbell Wrist Curl",
    "Farmers Walk",
    "Fat Bar Deadlift",
    "Gripper",
    "One-Handed Bar Hang",
    "Plate Pinch",
    "Plate Wrist Curl",
    "Towel Pull-Up",
  ],
  ForearmExtensor: ["Barbell Wrist Extension", "Dumbbell Wrist Extension"],
  Cardio: ["Rowing Machine", "Stationary Bike"],
};

const AddSchedule = () => {
  const [selectedExercises, setSelectedExercises] = useState({});
  const [exerciseCounts, setExerciseCounts] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params; // Get userId from route parameters

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
      Alert.alert(
        "Error",
        "Please fill out all fields and select at least one exercise."
      );
      return;
    }

    // Prepare the exercises list with count as varchar
    const exercisesList = Object.keys(selectedExercises)
      .filter((exercise) => selectedExercises[exercise])
      .map((exercise) => ({
        name: exercise,
        count: exerciseCounts[exercise]
          ? exerciseCounts[exercise].toString()
          : "0", // Convert count to string
      }));

    // Clear existing schedule for the user
    const { error: deleteError } = await supabase
      .from("schedule")
      .delete()
      .eq("user_id", userId);

    if (deleteError) {
      console.error("Error deleting previous schedule:", deleteError);
      Alert.alert(
        "Error",
        "There was an error deleting the previous schedule."
      );
      return;
    }

    // Insert new schedule
    const { data, error } = await supabase.from("schedule").insert({
      user_id: userId,
      exercises: exercisesList, // Insert array directly
    });

    if (error) {
      console.error("Error adding schedule:", error);
      Alert.alert("Error", "There was an error adding the schedule.");
    } else {
      console.log("Schedule added:", data);
      Alert.alert("Success", "Schedule added successfully!");
      setSelectedExercises({});
      setExerciseCounts({});
      navigation.goBack();
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
      {Object.keys(exercises).map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => toggleCategory(category)}>
            <Text style={styles.categoryTitle}>{category} Exercises</Text>
          </TouchableOpacity>
          {expandedCategories[category] &&
            exercises[category].map((exercise) => (
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
      <View style={styles.button}>
        <Button title="Add Schedule" onPress={handleAddSchedule} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
});

export default AddSchedule;
