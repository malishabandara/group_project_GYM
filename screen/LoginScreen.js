import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import COLOR from "../config/color";
import AppText from "../component/AppText";
import AppTextInput from "../component/AppTextInput";
import AppButton from "../component/AppButton";

import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/loginImage.jpg")}
        style={styles.bgImge}
      />
      <View style={styles.loginFormContainer}>
        <AppText>Welcome Back</AppText>
        <TextInput
          placeholder="Enter Email Address"
          placeholderTextColor="white"
          style={styles.inputField}
        />
        <TextInput
          placeholder="Enter Password"
          name="password"
          secureTextEntry
          style={styles.inputField}
          placeholderTextColor="white"
        />

        <View style={styles.btnContainer}>
          <AppButton title="Login" textColor="black" />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.text1}>Already haven't an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterFormScreen")}
          >
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
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
    //alignItems: "center",
  },
  bgImge: {
    width: "100%",
    height: 800,
    opacity: 0.8,
  },
  loginFormContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    top: "50%",
    padding: 20,
    width: "100%",
  },
  inputField: {
    backgroundColor: "transparent",
    color: COLOR.primary,
    lineHeight: 23,
    fontSize: 18,
    width: "100%",
    height: 50,
    padding: 5,
    borderBottomColor: COLOR.primary,
    borderBottomWidth: 1,
  },
  btnContainer: {
    marginVertical: 25,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
export default LoginScreen;
