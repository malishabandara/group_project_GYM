import { Slot, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import * as SplashScreen_ from "expo-splash-screen";
import { getUserData } from "../services/userServices";

import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import RegisterScreen from "./RegisterScreen";
import SuccessScreen from "./SplashScreen";
import WeightScreen from "./weightScreen";
import LogRoute from "./LogRoute";
import Register from "./Register";
import Login from "./Login";
import Welcome from "./Welcome";
import Index from "./Index";
import main_home from "./(main)/Home";
import admin_tabs from "./(admin_tabs)/_layout";
import SplashScreen from "./SplashScreen";
import MemberCard from "./admin/MemberCard ";
import ViewUserDetails from "./admin/ViewUserDetails";
import ViewSchedule from "./admin/ViewSchedule";
import AddSchedule from "./admin/AddSchedule";
import MealPlans from "./admin/meal_plans";
import { MealPlansContext } from "./context/MealPlansContext";
import { UsersContext } from "./context/UsersContext";
import userTabs from "./(userTabs)/home";
import user from "./(user)/_layout";
import body from "./(body)/_layout";

const Stack = createStackNavigator();

const _layout = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainLayout"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainLayout" component={MainLayout} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="(main)/Home" component={main_home} />
          <Stack.Screen name="WeightScreen" component={WeightScreen} />
          <Stack.Screen name="LogRoute" component={LogRoute} />
          <Stack.Screen name="(admin_tabs)" component={admin_tabs} />
          <Stack.Screen
            name="(userTabs)"
            component={userTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(user)"
            component={user}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(body)"
            component={body}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="admin/MemberCard"
            component={MemberCard}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: "User Details",
              headerBackTitle: "Back",
            })}
          />
          <Stack.Screen
            name="admin/ViewUserDetails"
            component={ViewUserDetails}
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
            component={ViewSchedule}
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
            component={AddSchedule}
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
            component={MealPlans}
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
          <Stack.Screen
            name="context/MealPlansContext"
            component={MealPlansContext}
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
          <Stack.Screen
            name="context/UsersContext"
            component={UsersContext}
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
    </AuthProvider>
  );
};

const MainLayout = ({ navigation }) => {
  const { setAuth, setUserData } = useAuth();
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
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Session user: ", session?.user.id);

      if (!loaded) {
        SplashScreen_.preventAutoHideAsync();
      } else {
        SplashScreen_.hideAsync();
      }

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
        console.log("ready to navigate");
        navigation.navigate("Index");
      } else {
        setAuth(null);
        navigation.navigate("Welcome");
      }
    });

    // return () => {
    //   authListener.data?.unsubscribe();
    // };
  }, [loaded]);

  const updateUserData = async (user) => {
    let res = await getUserData(user?.id);
    if (res.success) setUserData(res.data);
    console.log("got user data: ", res);
  };

  if (!loaded) {
    return null;
  }

  return <Slot />;
};

export default _layout;
