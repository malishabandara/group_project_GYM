import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
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
      <Text style={styles.title}>Previous Meal Plans:</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={previousMeals}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.mealItem}>{item.meals}</Text>
            )}
          />
        </>
      )}
      <TextInput
        style={styles.input}
        placeholder="Meals"
        value={meals}
        onChangeText={setMeals}
      />
      <Button title="Add Meal Plan" onPress={handleAddMealPlan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  mealItem: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default MealPlans;
