import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const UserLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="contactCoach" options={{ headerShown: false }} />

        <Stack.Screen name="mealPlans" options={{ headerShown: false }} />
        <Stack.Screen name="breakfastPlan" options={{ headerShown: false }} />
        <Stack.Screen name="lunchPlan" options={{ headerShown: false }} />
        <Stack.Screen name="dinnerPlan" options={{ headerShown: false }} />
        <Stack.Screen name="snackPlan" options={{ headerShown: false }} />

        <Stack.Screen name="body" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default UserLayout;
