import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../../lib/supabase'; // Adjust the import path as needed

const MealPlans = () => {
  const route = useRoute();  
  const { userId: initialUserId } = route.params || {};
  const [userId, setUserId] = useState(initialUserId || "");
  const [meals, setMeals] = useState("");
  const [previousMeals, setPreviousMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlans = async () => {
      if (!userId) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('meal_plans')
        .select('meals')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching meal plans:', error);
        Alert.alert('Error', 'There was an error fetching the meal plans.');
      } else {
        setPreviousMeals(data);
      }
      setLoading(false);
    };

    fetchMealPlans();
  }, [userId]);

  const handleAddMealPlan = async () => {
    if (!userId || !meals) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    setLoading(true);
    // Delete existing meal plans for this user
    const { error: deleteError } = await supabase
      .from('meal_plans')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Error deleting old meal plans:', deleteError);
      Alert.alert('Error', 'There was an error deleting the previous meal plans.');
      setLoading(false);
      return;
    }

    // Insert new meal plan
    const { data, error } = await supabase.from('meal_plans').insert([
      { user_id: userId, meals },
    ]);

    if (error) {
      console.error('Error adding meal plan:', error);
      Alert.alert('Error', 'There was an error adding the meal plan.');
    } else {
      console.log('Meal plan added:', data);
      Alert.alert('Success', 'Meal plan added successfully!');
      // Refresh the previous meal plans list
      setPreviousMeals([{ meals }]); // Only the new meal plan
      setMeals("");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : previousMeals.length === 0 ? (
        <Text style={styles.noMealPlansText}>No meal plans added yet!</Text> // Show this if no meal plans are found
      ) : (
        <FlatList
          data={previousMeals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.mealItem}>{item.meals}</Text>
          )}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Add Meals"
        placeholderTextColor="rgba(118, 74, 188, 0.5)"
        value={meals}
        onChangeText={setMeals}
        selectionColor="#764ABC"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddMealPlan}
      >
        <Text style={styles.addButtonText}>Add Meal Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FB',
  },
  input: {
    height: 50,
    borderColor: '#764ABC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    padding: 8,
  },
  mealItem: {
    fontSize: 18,
    marginBottom: 8,
    color: '#764ABC'
  },
  noMealPlansText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
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

export default MealPlans;
