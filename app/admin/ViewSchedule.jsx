import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, Button, TouchableOpacity, SafeAreaView } from "react-native";
import { supabase } from "../../lib/supabase"; // Adjust the import path as needed
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SectionList } from 'react-native';
// Define the exercises object here to map exercises back to their categories
const exercises = {
  Chest: ["Band-Assisted Bench Press", "Bar Dip", "Bench Press", "Bench Press Against Band", "Board Press", "Cable Chest Press", "Close-Grip Bench Press", "Close-Grip Feet-Up Bench Press", "Decline Bench Press", "Decline Push-Up", "Dumbbell Chest Fly", "Dumbbell Chest Press", "Dumbbell Decline Chest Press", "Dumbbell Floor Press", "Dumbbell Pullover", "Feet-Up Bench Press", "Floor Press", "Incline Bench Press", "Incline Dumbbell Press", "Incline Push-Up", "Kettlebell Floor Press", "Kneeling Incline Push-Up", "Kneeling Push-Up", "Machine Chest Fly", "Machine Chest Press", "Pec Deck", "Pin Bench Press", "Push-Up", "Push-Up Against Wall", "Push-Ups With Feet in Rings", "Resistance Band Chest Fly", "Smith Machine Bench Press", "Smith Machine Incline Bench Press", "Standing Cable Chest Fly", "Standing Resistance Band Chest Fly"],
  Shoulders: ["Band External Shoulder Rotation", "Band Internal Shoulder Rotation", "Band Pull-Apart", "Barbell Front Raise", "Barbell Rear Delt Row", "Barbell Upright Row", "Behind the Neck Press", "Cable Lateral Raise", "Cable Rear Delt Row", "Dumbbell Front Raise", "Dumbbell Horizontal Internal Shoulder Rotation", "Dumbbell Horizontal External Shoulder Rotation", "Dumbbell Lateral Raise", "Dumbbell Rear Delt Row", "Dumbbell Shoulder Press", "Face Pull", "Front Hold", "Lying Dumbbell External Shoulder Rotation", "Lying Dumbbell Internal Shoulder Rotation", "Machine Lateral Raise", "Machine Shoulder Press", "Monkey Row", "Overhead Press", "Plate Front Raise", "Power Jerk", "Push Press", "Reverse Cable Flyes", "Reverse Dumbbell Flyes", "Reverse Machine Fly", "Seated Dumbbell Shoulder Press", "Seated Barbell Overhead Press", "Seated Smith Machine Shoulder Press", "Snatch Grip Behind the Neck Press", "Squat Jerk", "Split Jerk"],
  Biceps: ["Barbell Curl", "Barbell Preacher Curl", "Bodyweight Curl", "Cable Curl With Bar", "Cable Curl With Rope", "Concentration Curl", "Dumbbell Curl", "Dumbbell Preacher Curl", "Hammer Curl", "Incline Dumbbell Curl", "Machine Bicep Curl", "Spider Curl"],
  Triceps: ["Barbell Standing Triceps Extension", "Barbell Lying Triceps Extension", "Bench Dip", "Close-Grip Push-Up", "Dumbbell Lying Triceps Extension", "Dumbbell Standing Triceps Extension", "Overhead Cable Triceps Extension", "Tricep Bodyweight Extension", "Tricep Pushdown With Bar", "Tricep Pushdown With Rope"],
  Legs: ["Air Squat", "Barbell Hack Squat", "Barbell Lunge", "Barbell Walking Lunge", "Belt Squat", "Body Weight Lunge", "Bodyweight Leg Curl", "Box Squat", "Bulgarian Split Squat", "Chair Squat", "Dumbbell Lunge", "Dumbbell Squat", "Front Squat", "Goblet Squat", "Hack Squat Machine", "Half Air Squat", "Hip Adduction Machine", "Jumping Lunge", "Landmine Hack Squat", "Landmine Squat", "Leg Curl On Ball", "Leg Extension", "Leg Press", "Lying Leg Curl", "Nordic Hamstring Eccentric", "Pause Squat", "Reverse Barbell Lunge", "Romanian Deadlift", "Safety Bar Squat", "Seated Leg Curl", "Shallow Body Weight Lunge", "Side Lunges (Bodyweight)", "Smith Machine Squat", "Squat", "Step Up", "Zercher Squat"],
  Back: ["Assisted Chin-Up", "Assisted Pull-Up", "Back Extension", "Banded Muscle-Up", "Barbell Row", "Barbell Shrug", "Block Clean", "Block Snatch", "Cable Close Grip Seated Row", "Cable Wide Grip Seated Row", "Chin-Up", "Clean", "Clean and Jerk", "Deadlift", "Deficit Deadlift", "Dumbbell Deadlift", "Dumbbell Row", "Dumbbell Shrug", "Floor Back Extension", "Good Morning", "Hang Clean", "Hang Power Clean", "Hang Power Snatch", "Hang Snatch", "Inverted Row", "Inverted Row with Underhand Grip", "Jefferson Curl", "Jumping Muscle-Up", "Kettlebell Swing", "Lat Pulldown With Pronated Grip", "Lat Pulldown With Supinated Grip", "Muscle-Up (Bar)", "Muscle-Up (Rings)", "One-Handed Cable Row", "One-Handed Lat Pulldown", "Pause Deadlift", "Pendlay Row", "Power Clean", "Power Snatch", "Pull-Up", "Pull-Up With a Neutral Grip", "Rack Pull", "Ring Pull-Up", "Ring Row", "Seal Row", "Seated Machine Row", "Snatch", "Snatch Grip Deadlift", "Stiff-Legged Deadlift", "Straight Arm Lat Pulldown", "Sumo Deadlift", "T-Bar Row", "Trap Bar Deadlift With High Handles", "Trap Bar Deadlift With Low Handles"],
  Glutes: ["Banded Side Kicks", "Cable Pull Through", "Clamshells", "Dumbbell Romanian Deadlift", "Dumbbell Frog Pumps", "Fire Hydrants", "Frog Pumps", "Glute Bridge", "Hip Abduction Against Band", "Hip Abduction Machine", "Hip Thrust", "Hip Thrust Machine", "Hip Thrust With Band Around Knees", "Lateral Walk With Band", "Machine Glute Kickbacks", "One-Legged Glute Bridge", "One-Legged Hip Thrust", "Reverse Hyperextension", "Romanian Deadlift", "Single Leg Romanian Deadlift", "Standing Glute Kickback in Machine", "Step Up"],
  Abs: ["Ball Slams", "Cable Crunch", "Crunch", "Dead Bug", "Hanging Knee Raise", "Hanging Leg Raise", "Hanging Sit-Up", "High to Low Wood Chop with Band", "Horizontal Wood Chop with Band", "Kneeling Ab Wheel Roll-Out", "Kneeling Plank", "Kneeling Side Plank", "Lying Leg Raise", "Lying Windshield Wiper", "Lying Windshield Wiper with Bent Knees", "Machine Crunch", "Mountain Climbers", "Oblique Crunch", "Oblique Sit-Up", "Plank", "Plank with Leg Lifts", "Side Plank", "Sit-Up"],
  Calves: ["Barbell Standing Calf Raise", "Eccentric Heel Drop", "Heel Raise", "Seated Calf Raise", "Standing Calf Raise"],
  Forearm: ["Barbell Wrist Curl", "Barbell Wrist Curl Behind the Back", "Bar Hang", "Dumbbell Wrist Curl", "Farmers Walk", "Fat Bar Deadlift", "Gripper", "One-Handed Bar Hang", "Plate Pinch", "Plate Wrist Curl", "Towel Pull-Up"],
  ForearmExtensor: ["Barbell Wrist Extension", "Dumbbell Wrist Extension"],
};

const ViewSchedule = () => {
  const [existingSchedule, setExistingSchedule] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  useEffect(() => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing.");
      navigation.goBack();
    }
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchSchedule();
    }, [userId])
  );

  const fetchSchedule = async () => {
    const { data, error } = await supabase
      .from("schedule")
      .select("day, exercises")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching schedule:", error);
      Alert.alert("Error", "There was an error fetching the schedule.");
    } else if (data && data.length > 0) {
      try {
        const parsedData = data.map(entry => ({
          day: entry.day,
          exercises: typeof entry.exercises === 'string' 
            ? JSON.parse(entry.exercises) 
            : entry.exercises
        }));
        setExistingSchedule(parsedData);
      } catch (err) {
        console.error("Error parsing exercises data:", err);
        Alert.alert("Error", "There was an error parsing the schedule data.");
      }
    } else {
      setExistingSchedule([]);
    }
  };

  const getExerciseCategory = (exerciseName) => {
    for (const category in exercises) {
      if (exercises[category].includes(exerciseName)) {
        return category;
      }
    }
    return "Unknown";
  };

  const groupExercisesByCategory = () => {
    const sections = [];

    existingSchedule.forEach(({ day, exercises }) => {
      const sectionData = {};

      exercises.forEach((exercise) => {
        const category = getExerciseCategory(exercise.name);
        if (!sectionData[category]) {
          sectionData[category] = [];
        }
        sectionData[category].push(exercise);
      });

      sections.push({
        title: day,
        data: Object.keys(sectionData).map(category => ({
          category,
          exercises: sectionData[category]
        }))
      });
    });

    return sections;
  };

  const sections = groupExercisesByCategory();

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            {item.exercises.map((exercise, index) => (
              <View key={index} style={styles.scheduleItem}>
                <Text style={styles.scheduleText}>{exercise.name}</Text>
                <Text style={styles.scheduleText}>{exercise.count}</Text>
              </View>
            ))}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.dayTitle}>{title}</Text>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noWorkoutsText}>No workouts scheduled!!!</Text>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('admin/AddSchedule', { userId })}
      >
        <Text style={styles.addButtonText}>Add Schedule</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F9FB",
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: '#764ABC',
    textAlign: 'center'
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: '#764ABC',
  },
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  scheduleText: {
    fontSize: 16,
    color: '#764ABC',
  },
  noWorkoutsText: {
    fontSize: 16,
    color: "red",
  },
  addButton: {
    backgroundColor: '#764ABC',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 15,
  },
  addButtonText: {
    color: '#F8F9FB',
    fontSize: 16,
  },
});

export default ViewSchedule;