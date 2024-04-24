import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen_ from "./screen/SplashScreen_";
import AdminScreen from "./screen/AdminScreen";
import RegisterScreen from "./screen/RegisterScreen";
import RegisterFormScreen from "./screen/RegisterFormScreen";
import OtpScreen from "./screen/OtpScreen";
import SuccessfullyScreen from "./screen/SuccessfullyScreen";
import LoginScreen from "./screen/LoginScreen";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import COLOR from "./config/color";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/Fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const Stack = createNativeStackNavigator();
  const StackNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLOR.primary, height: 50, width: 100 },
      }}
    >
      <Stack.Screen
        name="SplashScreen_"
        component={SplashScreen_}
        options={{
          headerStyle: { backgroundColor: COLOR.primary },
          headerTintColor: COLOR.white,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{
          headerStyle: { backgroundColor: COLOR.primary },
          headerTintColor: COLOR.black,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register Screen",
          headerStyle: { backgroundColor: COLOR.primary },
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen
        name="RegisterFormScreen"
        component={RegisterFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{ title: "OTP Screen" }}
      />
      <Stack.Screen
        name="SuccessfullyScreen"
        component={SuccessfullyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins-Regular",
  },
});
