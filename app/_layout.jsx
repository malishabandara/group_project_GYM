import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";


const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const [loaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Session user: ", session?.user.id);

      if (loaded) {
        SplashScreen.hideAsync();
      }

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.push("/Home");
      } else {
        setAuth(null);
        router.push("/Welcome");
      }
    });
  }, [loaded]);

  const updateUserData = async (user) => {
    let res = await getUserData(user?.id);
    console.log("got user data: ", res);
  };

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Register"/>
      <Stack.Screen name="admin/UserDetails" options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "User Details",
          headerBackTitle: "Back",
        })}/>
      <Stack.Screen name="admin/ViewUserDetails" options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Profiles",
          headerBackTitle: "Back",
        })}/>
      <Stack.Screen name="admin/ViewSchedule" options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Workouts",
          headerBackTitle: "Back",
        })}/>
      <Stack.Screen name="admin/AddSchedule" options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Add Schedule",
          headerBackTitle: "Back",
        })}/>
      <Stack.Screen name="admin/meal_plans" options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Meal Plans",
          headerBackTitle: "Back",
        })}/>
    </Stack>
  );
};

export default _layout;
