import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import COLOR from "../config/color";
import Shape from "../component/Shape";
import AppText from "../component/AppText";
import AppButton from "../component/AppButton";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
function RegisterScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Shape
        image={require("../assets/RegScreenPic.png")}
        style={{ width: 400, height: 300 }}
      />
      <View style={styles.RegTopicContainer}>
        <View style={styles.title}>
          <AppText>Lets Get You Fit</AppText>
          <Text style={styles.subtitle}>
            Ready to get fit again? Lets us help you achieve your goal
          </Text>

          <View style={styles.btnContainer}>
            <AppButton
              title="Register"
              textColor="black"
              onPress={() => navigation.navigate("RegisterFormScreen")}
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.text1}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.text2}>Sign in</Text>
            </TouchableOpacity>
          </View>
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
  RegTopicContainer: {
    position: "absolute",
    flex: 1,
    top: "65%",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 2,
    opacity: 0.4,
    fontWeight: "600",
    marginTop: 10,
    color: COLOR.text,
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  text1: {
    fontSize: 18,
    fontWeight: "600",
    color: COLOR.text,
  },
  text2: {
    fontSize: 18,
    fontWeight: "600",
    color: COLOR.primary,
  },
});
export default RegisterScreen;
