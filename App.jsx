// App.js or any other file where you want to use the component
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MealPlansList from '../fitness_app/component/user/MealPlansList'; // Adjust the import path as needed

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MealPlansList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
