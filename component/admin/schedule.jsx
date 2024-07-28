import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import CheckBox from "expo-checkbox";
import Collapsible from "react-native-collapsible";
import { createClient } from "@supabase/supabase-js";

// Define the exercise data
const exercises = {
  chest: [
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
  shoulder: [
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
  bicep: [
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
  triceps: [
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
  leg: [
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
  back: [
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
  glute: [
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
  abs: [
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
  calves: [
    "Barbell Standing Calf Raise",
    "Eccentric Heel Drop",
    "Heel Raise",
    "Seated Calf Raise",
    "Standing Calf Raise",
  ],
  forearmFlexors: ["Barbell Wrist Curl", "Barbell Wrist Curl Behind the Back"],
  forearmExtensors: [
    "Barbell Wrist Extension",
    "Dumbbell Wrist Extension",
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
  cardio: ["Rowing Machine", "Stationary Bike"],
};

// Initialize Supabase client
const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

const Schedule = () => {
  const [selection, setSelection] = useState(() =>
    Object.keys(exercises).reduce((acc, category) => {
      acc[category] = new Array(exercises[category].length).fill(false);
      return acc;
    }, {})
  );

  const [collapsed, setCollapsed] = useState(
    Object.keys(exercises).reduce((acc, category) => {
      acc[category] = true; // Start with categories collapsed
      return acc;
    }, {})
  );

  const handleToggle = (category, index) => {
    const updatedSelection = { ...selection };
    updatedSelection[category][index] = !updatedSelection[category][index];
    setSelection(updatedSelection);
  };

  const handleCollapseToggle = (category) => {
    setCollapsed((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleSubmit = async () => {
    console.log("Selected exercises:", selection);

    const user_id = "your-user-id"; // Replace with your user ID
    const selectedExercises = [];

    Object.keys(selection).forEach((category) => {
      selection[category].forEach((isSelected, index) => {
        if (isSelected) {
          selectedExercises.push({
            category,
            exercise: exercises[category][index],
          });
        }
      });
    });

    const { data, error } = await supabase
      .from("schedule")
      .insert([
        {
          user_id,
          schedule: selectedExercises,
          how_many_times: selectedExercises.length,
        },
      ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercise Schedule</Text>
      </View>
      {Object.keys(exercises).map((category) => (
        <View key={category} style={styles.category}>
          <TouchableOpacity onPress={() => handleCollapseToggle(category)}>
            <Text style={styles.categoryTitle}>
              {category === "forearmFlexors"
                ? "Forearm  Flexors & Grip" // Added extra space here
                : category === "forearmExtensors"
                ? "Forearm  Extensors" // Added extra space here
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed[category]}>
            {exercises[category].map((exercise, index) => (
              <View key={exercise} style={styles.exerciseRow}>
                <CheckBox
                  value={selection[category][index]}
                  onValueChange={() => handleToggle(category, index)}
                />
                <Text style={styles.exerciseText}>{exercise}</Text>
              </View>
            ))}
          </Collapsible>
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  exerciseText: {
    marginLeft: 8,
  },
});

export default Schedule;
