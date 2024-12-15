import { useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { getUserData } from "../services/userServices";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import registerScreen from "./registerScreen";
import successScreen from "./successScreen";
import weightScreen from "./weightScreen";
import logRoute from "./logRoute";
const Stack = createStackNavigator();

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = (props) => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();
  const navigation = props.navigation;

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
    if (res.success) setUserData(res.data);
    console.log("got user data: ", res);
  };

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
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
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="(main)/Home" component={main / Home} />
        <Stack.Screen name="weightScreen" component={weightScreen} />
        <Stack.Screen name="logRoute" component={logRoute} />
        <Stack.Screen name="(admin_tabs)" component={admin_tabs} />
        <Stack.Screen
          name="admin/MemberCard"
          component={admin / MemberCard}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "User Details",
            headerBackTitle: "Back",
          })}
        />
        <Stack.Screen
          name="admin/ViewUserDetails"
          component={admin / ViewUserDetails}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Profiles",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#764ABC",
            },
            headerTintColor: "#F8F9FB",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="admin/ViewSchedule"
          component={admin / ViewSchedule}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Workouts",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#764ABC",
            },
            headerTintColor: "#F8F9FB",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="admin/AddSchedule"
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Add Schedule",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#764ABC",
            },
            headerTintColor: "#F8F9FB",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="admin/meal_plans"
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Meal Plans",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#764ABC",
            },
            headerTintColor: "#F8F9FB",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default _layout;
