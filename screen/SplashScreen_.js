import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
} from "react-native";
import COLOR from "../config/color";
import AppButton from "../component/AppButton";
import AppText from "../component/AppText";
import { useFonts } from "expo-font";
import Shape from "../component/Shape";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

export default function SplashScreen_() {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/Fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Shape image={require("../assets/splashPic1.png")} />
      <View style={styles.header}>
        <Text style={styles.line1}>Make</Text>
        <Text style={styles.line2}>Yourself Always Fit</Text>
        <Text style={styles.description}>
          The best Health and Fitness Center.Build your Health and fitness with
          us.
        </Text>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Get Started"
            textColor="black"
            onPress={() => navigation.navigate("RegisterScreen")}
          />
          <AppButton
            title="Admin"
            color="middle"
            textColor="white"
            onPress={() => navigation.navigate("AdminScreen")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //position: "relative",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLOR.black,
  },
  header: {
    position: "absolute",
    top: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    width: "100%",
  },
  line1: {
    fontSize: 30,
    fontWeight: "800",
    color: COLOR.primary,
    fontFamily: "Poppins-Regular",
  },
  line2: {
    fontSize: 25,
    fontWeight: "500",
    color: COLOR.white,
  },
  description: {
    textAlign: "center",
    padding: 10,
    width: 300,
    fontSize: 16,
    color: COLOR.text,
    opacity: 0.7,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 15,
    width: "100%",
  },
});
