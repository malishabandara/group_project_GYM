import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import { supabase } from "../../lib/supabase";

const workoutData = {
  Basic: {
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
  },
  "2 Days Workout": {
    "Day 1": {
      Chest: ["Band-Assisted Bench Press", "Bar Dip", "Bench Press", "Bench Press Against Band", "Board Press", "Cable Chest Press", "Close-Grip Bench Press", "Close-Grip Feet-Up Bench Press", "Decline Bench Press", "Decline Push-Up", "Dumbbell Chest Fly", "Dumbbell Chest Press", "Dumbbell Decline Chest Press", "Dumbbell Floor Press", "Dumbbell Pullover", "Feet-Up Bench Press", "Floor Press", "Incline Bench Press", "Incline Dumbbell Press", "Incline Push-Up", "Kettlebell Floor Press", "Kneeling Incline Push-Up", "Kneeling Push-Up", "Machine Chest Fly", "Machine Chest Press", "Pec Deck", "Pin Bench Press", "Push-Up", "Push-Up Against Wall", "Push-Ups With Feet in Rings", "Resistance Band Chest Fly", "Smith Machine Bench Press", "Smith Machine Incline Bench Press", "Standing Cable Chest Fly", "Standing Resistance Band Chest Fly"],
      Back: ["Assisted Chin-Up", "Assisted Pull-Up", "Back Extension", "Banded Muscle-Up", "Barbell Row", "Barbell Shrug", "Block Clean", "Block Snatch", "Cable Close Grip Seated Row", "Cable Wide Grip Seated Row", "Chin-Up", "Clean", "Clean and Jerk", "Deadlift", "Deficit Deadlift", "Dumbbell Deadlift", "Dumbbell Row", "Dumbbell Shrug", "Floor Back Extension", "Good Morning", "Hang Clean", "Hang Power Clean", "Hang Power Snatch", "Hang Snatch", "Inverted Row", "Inverted Row with Underhand Grip", "Jefferson Curl", "Jumping Muscle-Up", "Kettlebell Swing", "Lat Pulldown With Pronated Grip", "Lat Pulldown With Supinated Grip", "Muscle-Up (Bar)", "Muscle-Up (Rings)", "One-Handed Cable Row", "One-Handed Lat Pulldown", "Pause Deadlift", "Pendlay Row", "Power Clean", "Power Snatch", "Pull-Up", "Pull-Up With a Neutral Grip", "Rack Pull", "Ring Pull-Up", "Ring Row", "Seal Row", "Seated Machine Row", "Snatch", "Snatch Grip Deadlift", "Stiff-Legged Deadlift", "Straight Arm Lat Pulldown", "Sumo Deadlift", "T-Bar Row", "Trap Bar Deadlift With High Handles", "Trap Bar Deadlift With Low Handles"],
      Biceps: ["Barbell Curl", "Barbell Preacher Curl", "Bodyweight Curl", "Cable Curl With Bar", "Cable Curl With Rope", "Concentration Curl", "Dumbbell Curl", "Dumbbell Preacher Curl", "Hammer Curl", "Incline Dumbbell Curl", "Machine Bicep Curl", "Spider Curl"],
      Glutes: ["Banded Side Kicks", "Cable Pull Through", "Clamshells", "Dumbbell Romanian Deadlift", "Dumbbell Frog Pumps", "Fire Hydrants", "Frog Pumps", "Glute Bridge", "Hip Abduction Against Band", "Hip Abduction Machine", "Hip Thrust", "Hip Thrust Machine", "Hip Thrust With Band Around Knees", "Lateral Walk With Band", "Machine Glute Kickbacks", "One-Legged Glute Bridge", "One-Legged Hip Thrust", "Reverse Hyperextension", "Romanian Deadlift", "Single Leg Romanian Deadlift", "Standing Glute Kickback in Machine", "Step Up"],
  Abs: ["Ball Slams", "Cable Crunch", "Crunch", "Dead Bug", "Hanging Knee Raise", "Hanging Leg Raise", "Hanging Sit-Up", "High to Low Wood Chop with Band", "Horizontal Wood Chop with Band", "Kneeling Ab Wheel Roll-Out", "Kneeling Plank", "Kneeling Side Plank", "Lying Leg Raise", "Lying Windshield Wiper", "Lying Windshield Wiper with Bent Knees", "Machine Crunch", "Mountain Climbers", "Oblique Crunch", "Oblique Sit-Up", "Plank", "Plank with Leg Lifts", "Side Plank", "Sit-Up"],
  Calves: ["Barbell Standing Calf Raise", "Eccentric Heel Drop", "Heel Raise", "Seated Calf Raise", "Standing Calf Raise"],
  Forearm: ["Barbell Wrist Curl", "Barbell Wrist Curl Behind the Back", "Bar Hang", "Dumbbell Wrist Curl", "Farmers Walk", "Fat Bar Deadlift", "Gripper", "One-Handed Bar Hang", "Plate Pinch", "Plate Wrist Curl", "Towel Pull-Up"],
  ForearmExtensor: ["Barbell Wrist Extension", "Dumbbell Wrist Extension"],
    },
    "Day 2": {
      Legs: ["Air Squat", "Barbell Hack Squat", "Barbell Lunge", "Barbell Walking Lunge", "Belt Squat", "Body Weight Lunge", "Bodyweight Leg Curl", "Box Squat", "Bulgarian Split Squat", "Chair Squat", "Dumbbell Lunge", "Dumbbell Squat", "Front Squat", "Goblet Squat", "Hack Squat Machine", "Half Air Squat", "Hip Adduction Machine", "Jumping Lunge", "Landmine Hack Squat", "Landmine Squat", "Leg Curl On Ball", "Leg Extension", "Leg Press", "Lying Leg Curl", "Nordic Hamstring Eccentric", "Pause Squat", "Reverse Barbell Lunge", "Romanian Deadlift", "Safety Bar Squat", "Seated Leg Curl", "Shallow Body Weight Lunge", "Side Lunges (Bodyweight)", "Smith Machine Squat", "Squat", "Step Up", "Zercher Squat"],
      Shoulders: ["Band External Shoulder Rotation", "Band Internal Shoulder Rotation", "Band Pull-Apart", "Barbell Front Raise", "Barbell Rear Delt Row", "Barbell Upright Row", "Behind the Neck Press", "Cable Lateral Raise", "Cable Rear Delt Row", "Dumbbell Front Raise", "Dumbbell Horizontal Internal Shoulder Rotation", "Dumbbell Horizontal External Shoulder Rotation", "Dumbbell Lateral Raise", "Dumbbell Rear Delt Row", "Dumbbell Shoulder Press", "Face Pull", "Front Hold", "Lying Dumbbell External Shoulder Rotation", "Lying Dumbbell Internal Shoulder Rotation", "Machine Lateral Raise", "Machine Shoulder Press", "Monkey Row", "Overhead Press", "Plate Front Raise", "Power Jerk", "Push Press", "Reverse Cable Flyes", "Reverse Dumbbell Flyes", "Reverse Machine Fly", "Seated Dumbbell Shoulder Press", "Seated Barbell Overhead Press", "Seated Smith Machine Shoulder Press", "Snatch Grip Behind the Neck Press", "Squat Jerk", "Split Jerk"],
      Triceps: ["Barbell Standing Triceps Extension", "Barbell Lying Triceps Extension", "Bench Dip", "Close-Grip Push-Up", "Dumbbell Lying Triceps Extension", "Dumbbell Standing Triceps Extension", "Overhead Cable Triceps Extension", "Tricep Bodyweight Extension", "Tricep Pushdown With Bar", "Tricep Pushdown With Rope"],
      Glutes: ["Banded Side Kicks", "Cable Pull Through", "Clamshells", "Dumbbell Romanian Deadlift", "Dumbbell Frog Pumps", "Fire Hydrants", "Frog Pumps", "Glute Bridge", "Hip Abduction Against Band", "Hip Abduction Machine", "Hip Thrust", "Hip Thrust Machine", "Hip Thrust With Band Around Knees", "Lateral Walk With Band", "Machine Glute Kickbacks", "One-Legged Glute Bridge", "One-Legged Hip Thrust", "Reverse Hyperextension", "Romanian Deadlift", "Single Leg Romanian Deadlift", "Standing Glute Kickback in Machine", "Step Up"],
  Abs: ["Ball Slams", "Cable Crunch", "Crunch", "Dead Bug", "Hanging Knee Raise", "Hanging Leg Raise", "Hanging Sit-Up", "High to Low Wood Chop with Band", "Horizontal Wood Chop with Band", "Kneeling Ab Wheel Roll-Out", "Kneeling Plank", "Kneeling Side Plank", "Lying Leg Raise", "Lying Windshield Wiper", "Lying Windshield Wiper with Bent Knees", "Machine Crunch", "Mountain Climbers", "Oblique Crunch", "Oblique Sit-Up", "Plank", "Plank with Leg Lifts", "Side Plank", "Sit-Up"],
  Calves: ["Barbell Standing Calf Raise", "Eccentric Heel Drop", "Heel Raise", "Seated Calf Raise", "Standing Calf Raise"],
  Forearm: ["Barbell Wrist Curl", "Barbell Wrist Curl Behind the Back", "Bar Hang", "Dumbbell Wrist Curl", "Farmers Walk", "Fat Bar Deadlift", "Gripper", "One-Handed Bar Hang", "Plate Pinch", "Plate Wrist Curl", "Towel Pull-Up"],
  ForearmExtensor: ["Barbell Wrist Extension", "Dumbbell Wrist Extension"],
    },
  },
  "3 Days Workout": {
    "Day 1": {
      Chest: ["Band-Assisted Bench Press", "Bar Dip", "Bench Press", "Bench Press Against Band", "Board Press", "Cable Chest Press", "Close-Grip Bench Press", "Close-Grip Feet-Up Bench Press", "Decline Bench Press", "Decline Push-Up", "Dumbbell Chest Fly", "Dumbbell Chest Press", "Dumbbell Decline Chest Press", "Dumbbell Floor Press", "Dumbbell Pullover", "Feet-Up Bench Press", "Floor Press", "Incline Bench Press", "Incline Dumbbell Press", "Incline Push-Up", "Kettlebell Floor Press", "Kneeling Incline Push-Up", "Kneeling Push-Up", "Machine Chest Fly", "Machine Chest Press", "Pec Deck", "Pin Bench Press", "Push-Up", "Push-Up Against Wall", "Push-Ups With Feet in Rings", "Resistance Band Chest Fly", "Smith Machine Bench Press", "Smith Machine Incline Bench Press", "Standing Cable Chest Fly", "Standing Resistance Band Chest Fly"],
      Biceps: ["Barbell Curl", "Barbell Preacher Curl", "Bodyweight Curl", "Cable Curl With Bar", "Cable Curl With Rope", "Concentration Curl", "Dumbbell Curl", "Dumbbell Preacher Curl", "Hammer Curl", "Incline Dumbbell Curl", "Machine Bicep Curl", "Spider Curl"],
  Triceps: ["Barbell Standing Triceps Extension", "Barbell Lying Triceps Extension", "Bench Dip", "Close-Grip Push-Up", "Dumbbell Lying Triceps Extension", "Dumbbell Standing Triceps Extension", "Overhead Cable Triceps Extension", "Tricep Bodyweight Extension", "Tricep Pushdown With Bar", "Tricep Pushdown With Rope"],
      Glutes: ["Banded Side Kicks", "Cable Pull Through", "Clamshells", "Dumbbell Romanian Deadlift", "Dumbbell Frog Pumps", "Fire Hydrants", "Frog Pumps", "Glute Bridge", "Hip Abduction Against Band", "Hip Abduction Machine", "Hip Thrust", "Hip Thrust Machine", "Hip Thrust With Band Around Knees", "Lateral Walk With Band", "Machine Glute Kickbacks", "One-Legged Glute Bridge", "One-Legged Hip Thrust", "Reverse Hyperextension", "Romanian Deadlift", "Single Leg Romanian Deadlift", "Standing Glute Kickback in Machine", "Step Up"],
  Abs: ["Ball Slams", "Cable Crunch", "Crunch", "Dead Bug", "Hanging Knee Raise", "Hanging Leg Raise", "Hanging Sit-Up", "High to Low Wood Chop with Band", "Horizontal Wood Chop with Band", "Kneeling Ab Wheel Roll-Out", "Kneeling Plank", "Kneeling Side Plank", "Lying Leg Raise", "Lying Windshield Wiper", "Lying Windshield Wiper with Bent Knees", "Machine Crunch", "Mountain Climbers", "Oblique Crunch", "Oblique Sit-Up", "Plank", "Plank with Leg Lifts", "Side Plank", "Sit-Up"],
  Calves: ["Barbell Standing Calf Raise", "Eccentric Heel Drop", "Heel Raise", "Seated Calf Raise", "Standing Calf Raise"],
  Forearm: ["Barbell Wrist Curl", "Barbell Wrist Curl Behind the Back", "Bar Hang", "Dumbbell Wrist Curl", "Farmers Walk", "Fat Bar Deadlift", "Gripper", "One-Handed Bar Hang", "Plate Pinch", "Plate Wrist Curl", "Towel Pull-Up"],
  ForearmExtensor: ["Barbell Wrist Extension", "Dumbbell Wrist Extension"],
    },
    "Day 2": {
      Back: ["Assisted Chin-Up", "Assisted Pull-Up", "Back Extension", "Banded Muscle-Up", "Barbell Row", "Barbell Shrug", "Block Clean", "Block Snatch", "Cable Close Grip Seated Row", "Cable Wide Grip Seated Row", "Chin-Up", "Clean", "Clean and Jerk", "Deadlift", "Deficit Deadlift", "Dumbbell Deadlift", "Dumbbell Row", "Dumbbell Shrug", "Floor Back Extension", "Good Morning", "Hang Clean", "Hang Power Clean", "Hang Power Snatch", "Hang Snatch", "Inverted Row", "Inverted Row with Underhand Grip", "Jefferson Curl", "Jumping Muscle-Up", "Kettlebell Swing", "Lat Pulldown With Pronated Grip", "Lat Pulldown With Supinated Grip", "Muscle-Up (Bar)", "Muscle-Up (Rings)", "One-Handed Cable Row", "One-Handed Lat Pulldown", "Pause Deadlift", "Pendlay Row", "Power Clean", "Power Snatch", "Pull-Up", "Pull-Up With a Neutral Grip", "Rack Pull", "Ring Pull-Up", "Ring Row", "Seal Row", "Seated Machine Row", "Snatch", "Snatch Grip Deadlift", "Stiff-Legged Deadlift", "Straight Arm Lat Pulldown", "Sumo Deadlift", "T-Bar Row", "Trap Bar Deadlift With High Handles", "Trap Bar Deadlift With Low Handles"],
      Shoulders: ["Band External Shoulder Rotation", "Band Internal Shoulder Rotation", "Band Pull-Apart", "Barbell Front Raise", "Barbell Rear Delt Row", "Barbell Upright Row", "Behind the Neck Press", "Cable Lateral Raise", "Cable Rear Delt Row", "Dumbbell Front Raise", "Dumbbell Horizontal Internal Shoulder Rotation", "Dumbbell Horizontal External Shoulder Rotation", "Dumbbell Lateral Raise", "Dumbbell Rear Delt Row", "Dumbbell Shoulder Press", "Face Pull", "Front Hold", "Lying Dumbbell External Shoulder Rotation", "Lying Dumbbell Internal Shoulder Rotation", "Machine Lateral Raise", "Machine Shoulder Press", "Monkey Row", "Overhead Press", "Plate Front Raise", "Power Jerk", "Push Press", "Reverse Cable Flyes", "Reverse Dumbbell Flyes", "Reverse Machine Fly", "Seated Dumbbell Shoulder Press", "Seated Barbell Overhead Press", "Seated Smith Machine Shoulder Press", "Snatch Grip Behind the Neck Press", "Squat Jerk", "Split Jerk"],
      Glutes: ["Banded Side Kicks", "Cable Pull Through", "Clamshells", "Dumbbell Romanian Deadlift", "Dumbbell Frog Pumps", "Fire Hydrants", "Frog Pumps", "Glute Bridge", "Hip Abduction Against Band", "Hip Abduction Machine", "Hip Thrust", "Hip Thrust Machine", "Hip Thrust With Band Around Knees", "Lateral Walk With Band", "Machine Glute Kickbacks", "One-Legged Glute Bridge", "One-Legged Hip Thrust", "Reverse Hyperextension", "Romanian Deadlift", "Single Leg Romanian Deadlift", "Standing Glute Kickback in Machine", "Step Up"],
  Abs: ["Ball Slams", "Cable Crunch", "Crunch", "Dead Bug", "Hanging Knee Raise", "Hanging Leg Raise", "Hanging Sit-Up", "High to Low Wood Chop with Band", "Horizontal Wood Chop with Band", "Kneeling Ab Wheel Roll-Out", "Kneeling Plank", "Kneeling Side Plank", "Lying Leg Raise", "Lying Windshield Wiper", "Lying Windshield Wiper with Bent Knees", "Machine Crunch", "Mountain Climbers", "Oblique Crunch", "Oblique Sit-Up", "Plank", "Plank with Leg Lifts", "Side Plank", "Sit-Up"],
  Calves: ["Barbell Standing Calf Raise", "Eccentric Heel Drop", "Heel Raise", "Seated Calf Raise", "Standing Calf Raise"],
  Forearm: ["Barbell Wrist Curl", "Barbell Wrist Curl Behind the Back", "Bar Hang", "Dumbbell Wrist Curl", "Farmers Walk", "Fat Bar Deadlift", "Gripper", "One-Handed Bar Hang", "Plate Pinch", "Plate Wrist Curl", "Towel Pull-Up"],
  ForearmExtensor: ["Barbell Wrist Extension", "Dumbbell Wrist Extension"],
    },
    "Day 3": {
      Legs: ["Air Squat", "Barbell Hack Squat", "Barbell Lunge", "Barbell Walking Lunge", "Belt Squat", "Body Weight Lunge", "Bodyweight Leg Curl", "Box Squat", "Bulgarian Split Squat", "Chair Squat", "Dumbbell Lunge", "Dumbbell Squat", "Front Squat", "Goblet Squat", "Hack Squat Machine", "Half Air Squat", "Hip Adduction Machine", "Jumping Lunge", "Landmine Hack Squat", "Landmine Squat", "Leg Curl On Ball", "Leg Extension", "Leg Press", "Lying Leg Curl", "Nordic Hamstring Eccentric", "Pause Squat", "Reverse Barbell Lunge", "Romanian Deadlift", "Safety Bar Squat", "Seated Leg Curl", "Shallow Body Weight Lunge", "Side Lunges (Bodyweight)", "Smith Machine Squat", "Squat", "Step Up", "Zercher Squat"],
      Biceps: ["Barbell Curl", "Barbell Preacher Curl", "Bodyweight Curl", "Cable Curl With Bar", "Cable Curl With Rope", "Concentration Curl", "Dumbbell Curl", "Dumbbell Preacher Curl", "Hammer Curl", "Incline Dumbbell Curl", "Machine Bicep Curl", "Spider Curl"],
  Triceps: ["Barbell Standing Triceps Extension", "Barbell Lying Triceps Extension", "Bench Dip", "Close-Grip Push-Up", "Dumbbell Lying Triceps Extension", "Dumbbell Standing Triceps Extension", "Overhead Cable Triceps Extension", "Tricep Bodyweight Extension", "Tricep Pushdown With Bar", "Tricep Pushdown With Rope"],
      Glutes: ["Banded Side Kicks", "Cable Pull Through", "Clamshells", "Dumbbell Romanian Deadlift", "Dumbbell Frog Pumps", "Fire Hydrants", "Frog Pumps", "Glute Bridge", "Hip Abduction Against Band", "Hip Abduction Machine", "Hip Thrust", "Hip Thrust Machine", "Hip Thrust With Band Around Knees", "Lateral Walk With Band", "Machine Glute Kickbacks", "One-Legged Glute Bridge", "One-Legged Hip Thrust", "Reverse Hyperextension", "Romanian Deadlift", "Single Leg Romanian Deadlift", "Standing Glute Kickback in Machine", "Step Up"],
  Abs: ["Ball Slams", "Cable Crunch", "Crunch", "Dead Bug", "Hanging Knee Raise", "Hanging Leg Raise", "Hanging Sit-Up", "High to Low Wood Chop with Band", "Horizontal Wood Chop with Band", "Kneeling Ab Wheel Roll-Out", "Kneeling Plank", "Kneeling Side Plank", "Lying Leg Raise", "Lying Windshield Wiper", "Lying Windshield Wiper with Bent Knees", "Machine Crunch", "Mountain Climbers", "Oblique Crunch", "Oblique Sit-Up", "Plank", "Plank with Leg Lifts", "Side Plank", "Sit-Up"],
  Calves: ["Barbell Standing Calf Raise", "Eccentric Heel Drop", "Heel Raise", "Seated Calf Raise", "Standing Calf Raise"],
  Forearm: ["Barbell Wrist Curl", "Barbell Wrist Curl Behind the Back", "Bar Hang", "Dumbbell Wrist Curl", "Farmers Walk", "Fat Bar Deadlift", "Gripper", "One-Handed Bar Hang", "Plate Pinch", "Plate Wrist Curl", "Towel Pull-Up"],
  ForearmExtensor: ["Barbell Wrist Extension", "Dumbbell Wrist Extension"],
    },
  },
};

const AddSchedule = () => {
  const [selectedWorkout, setSelectedWorkout] = useState("Basic");
  const [selectedDay, setSelectedDay] = useState(null);
  const [workoutDays, setWorkoutDays] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [exercisesByDay, setExercisesByDay] = useState({}); // Store exercises per day
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalType, setModalType] = useState(""); // 'workout' or 'day'
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const handleExerciseChange = (exercise) => {
    setExercisesByDay(prevExercisesByDay => ({
      ...prevExercisesByDay,
      [selectedDay]: {
        ...(prevExercisesByDay[selectedDay] || {}),
        [exercise]: {
          selected: !prevExercisesByDay[selectedDay]?.[exercise]?.selected,
          count: prevExercisesByDay[selectedDay]?.[exercise]?.count || "0"
        }
      }
    }));
  };

  const handleCountChange = (exercise, count) => {
    setExercisesByDay(prevExercisesByDay => ({
      ...prevExercisesByDay,
      [selectedDay]: {
        ...(prevExercisesByDay[selectedDay] || {}),
        [exercise]: {
          selected: prevExercisesByDay[selectedDay]?.[exercise]?.selected || false,
          count: count
        }
      }
    }));
  };

  const handleAddSchedule = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }
  
    // Check if at least one exercise is selected for non-basic workouts
    if (selectedWorkout !== "Basic" && workoutDays.length === 0) {
      Alert.alert("Error", "Please select at least one day.");
      return;
    }
  
    let rowsToInsert = [];
  
    if (selectedWorkout === "Basic") {
      // Prepare rows for "Basic Workout"
      const exercisesForBasic = Object.keys(exercisesByDay["Basic"] || {})
        .filter(exercise => exercisesByDay["Basic"][exercise]?.selected)
        .map(exercise => ({
          name: exercise,
          count: exercisesByDay["Basic"][exercise]?.count || "0",
        }));
  
      console.log("Exercises for Basic Workout:", exercisesForBasic); // Debugging line
  
      // Only add to rowsToInsert if there are exercises
      if (exercisesForBasic.length > 0) {
        rowsToInsert.push({
          user_id: userId,
          exercises: exercisesForBasic,
          day: "Basic", // Use a special identifier for "Basic Workout"
        });
      } else {
        Alert.alert("Error", "No exercises selected for Basic Workout.");
        return;
      }
    } else {
      // Prepare rows for each day with unique exercise data for day-based workouts
      rowsToInsert = workoutDays.map(day => {
        const exercisesForDay = Object.keys(exercisesByDay[day] || {})
          .filter(exercise => exercisesByDay[day][exercise]?.selected)
          .map(exercise => ({
            name: exercise,
            count: exercisesByDay[day][exercise]?.count || "0",
          }));
  
        console.log(`Exercises for ${day}:`, exercisesForDay); // Debugging line
  
        return {
          user_id: userId,
          exercises: exercisesForDay,
          day: day,
        };
      });
    }
  
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
  
    // Insert new schedule rows
    const { data, error } = await supabase.from("schedule").insert(rowsToInsert);
  
    if (error) {
      console.error("Error adding schedule:", error);
      Alert.alert("Error", "There was an error adding the schedule.");
    } else {
      console.log("Schedule added:", data);
      Alert.alert("Success", "Schedule added successfully!");
      setExercisesByDay({});
      navigation.goBack();
    }
  };
  
  
  

  const toggleCategory = (category) => {
    setExpandedCategories((prevExpandedCategories) => ({
      ...prevExpandedCategories,
      [category]: !prevExpandedCategories[category],
    }));
  };

  const handleWorkoutChange = (workoutType) => {
    setSelectedWorkout(workoutType);
    if (workoutType === "2 Days Workout") {
      setWorkoutDays(["Day 1", "Day 2"]);
      setSelectedDay("Day 1");
    } else if (workoutType === "3 Days Workout") {
      setWorkoutDays(["Day 1", "Day 2", "Day 3"]);
      setSelectedDay("Day 1");
    } else {
      setWorkoutDays(null);
      setSelectedDay(null); // Clear selected day for Basic
    }
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  return (
    <View style={styles.container}>
      {/* Workout Type Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            selectedWorkout === "Basic" && styles.selectedButton,
          ]}
          onPress={() => handleWorkoutChange("Basic")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedWorkout === "Basic" && styles.selectedButtonText,
            ]}
          >Basic Workout</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            selectedWorkout === "2 Days Workout" && styles.selectedButton,
          ]}
          onPress={() => handleWorkoutChange("2 Days Workout")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedWorkout === "2 Days Workout" && styles.selectedButtonText,
            ]}
          >2 Days Workout</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            selectedWorkout === "3 Days Workout" && styles.selectedButton,
          ]}
          onPress={() => handleWorkoutChange("3 Days Workout")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedWorkout === "3 Days Workout" && styles.selectedButtonText,
            ]}
          >3 Days Workout</Text>
        </Pressable>
      </View>

      {/* Day Selection Buttons */}
      {workoutDays && (
        <View style={styles.buttonContainer}>
          {workoutDays.map((day) => (
            <Pressable
              key={day}
              style={[
                styles.button,
                selectedDay === day && styles.selectedButton,
              ]}
              onPress={() => handleDayChange(day)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedDay === day && styles.selectedButtonText,
                ]}
              >{day}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Exercises Section */}
      <ScrollView style={styles.scrollView}>
        {selectedWorkout === "Basic" ? (
          // Render exercises for "Basic Workout"
          Object.keys(workoutData.Basic).map((category) => (
            <View key={category} style={styles.categoryContainer}>
              <TouchableOpacity onPress={() => toggleCategory(category)}>
                <Text style={styles.categoryTitle}>{category} Exercises</Text>
              </TouchableOpacity>
              {expandedCategories[category] &&
                workoutData.Basic[category].map((exercise) => (
                  <View key={exercise} style={styles.exerciseContainer}>
                    <Checkbox
                      status={exercisesByDay[selectedDay]?.[exercise]?.selected ? "checked" : "unchecked"}
                      onPress={() => handleExerciseChange(exercise)}
                      color="#764ABC"
                    />
                    <Text style={styles.exerciseLabel}>{exercise}</Text>
                    <TextInput
                      style={styles.countInput}
                      placeholder="How Many"
                      value={exercisesByDay[selectedDay]?.[exercise]?.count || ""}
                      onChangeText={(count) => handleCountChange(exercise, count)}
                      keyboardType="numeric"
                    />
                  </View>
                ))}
            </View>
          ))
        ) : (
          // Render exercises for selected day and workout type
          Object.keys(workoutData[selectedWorkout]?.[selectedDay] || {}).map((category) => (
            <View key={category} style={styles.categoryContainer}>
              <TouchableOpacity onPress={() => toggleCategory(category)}>
                <Text style={styles.categoryTitle}>{category} Exercises</Text>
              </TouchableOpacity>
              {expandedCategories[category] &&
                workoutData[selectedWorkout]?.[selectedDay]?.[category]?.map((exercise) => (
                  <View key={exercise} style={styles.exerciseContainer}>
                    <Checkbox
                      status={exercisesByDay[selectedDay]?.[exercise]?.selected ? "checked" : "unchecked"}
                      onPress={() => handleExerciseChange(exercise)}
                      color="#764ABC"
                    />
                    <Text style={styles.exerciseLabel}>{exercise}</Text>
                    <TextInput
                      style={styles.countInput}
                      placeholder="How Many"
                      placeholderTextColor="rgba(118, 74, 188, 0.5)"
                      value={exercisesByDay[selectedDay]?.[exercise]?.count || ""}
                      onChangeText={(count) => handleCountChange(exercise, count)}
                      keyboardType="numeric"
                      selectionColor="#764ABC"
                    />
                  </View>
                ))}
            </View>
          ))
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddSchedule}
        >
          <Text style={styles.addButtonText}>Add Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: '#F8F9FB'
  },
  selectedButton: {
    backgroundColor: '#764ABC',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#764ABC',
  },
  selectedButtonText: {
    color: '#F8F9FB'
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#764ABC',
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  exerciseLabel: {
    flex: 1,
    fontSize: 16,
    color: '#764ABC',
  },
  countInput: {
    width: 100,
    borderWidth: 1,
    borderColor: 'rgba(118, 74, 188, 0.5)',
    padding: 8,
    marginLeft: 8,
    borderRadius: 4,
  },
  button: {
    marginVertical: 16,
  },
  addButton: {
    backgroundColor: '#764ABC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#F8F9FB',
    fontSize: 16,
  },
});

export default AddSchedule;
