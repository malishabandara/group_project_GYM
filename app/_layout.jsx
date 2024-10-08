import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { getUserData } from "../services/userServices";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

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

      // if (loaded) {
      //   SplashScreen.hideAsync();
      // }

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace("/Home");
      } else {
        setAuth(null);
        router.replace("/Welcome");
      }
    });
  }, []);

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
      <Stack.Screen name="Register" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="index" />
      <Stack.Screen name="registerScreen" />
      <Stack.Screen name="SplashScreen" />
      <Stack.Screen name="successScreen" />
      <Stack.Screen name="Welcome" />
      <Stack.Screen name="(main)/Home" />
      <Stack.Screen name="weightScreen" />
      {/* <Stack.Screen name="AdminLogin" /> */}
    </Stack>
  );
};

export default _layout;
