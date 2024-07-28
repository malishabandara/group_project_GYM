import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

const Workout = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const user_id = "your-user-id"; // Replace with the actual user ID

      const { data, error } = await supabase
        .from("schedule")
        .select("schedule, how_many_times")
        .eq("user_id", user_id);

      if (error) {
        console.error("Error fetching workout data:", error);
      } else {
        setWorkoutData(data);
      }

      setLoading(false);
    };

    fetchWorkoutData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Workout Schedule</Text>
      {workoutData.length === 0 ? (
        <Text>No workout schedule found for this user.</Text>
      ) : (
        workoutData.map((workout, index) => (
          <View key={index} style={styles.workoutCard}>
            <Text style={styles.workoutTitle}>Schedule {index + 1}</Text>
            <Text>How Many Times: {workout.how_many_times}</Text>
            <Text style={styles.subHeader}>Exercises:</Text>
            {workout.schedule.map((exercise, idx) => (
              <Text key={idx} style={styles.exerciseText}>
                {exercise.category}: {exercise.exercise}
              </Text>
            ))}
          </View>
        ))
      )}
    </ScrollView>
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
    marginBottom: 20,
  },
  workoutCard: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  exerciseText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default Workout;
