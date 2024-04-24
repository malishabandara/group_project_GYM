import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Shape from "../component/Shape";
import COLOR from "../config/color";
import AppText from "../component/AppText";
import AppButton from "../component/AppButton";
import { useNavigation } from "@react-navigation/native";

function OtpScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Shape
        image={require("../assets/OTPic.png")}
        style={{ width: 400, height: 300 }}
      />

      <View style={styles.titleContainer}>
        <AppText>OTP Verification</AppText>
        <Text style={styles.subTitle}>
          Enter the verification code we just send to your email id{" "}
        </Text>

        <View style={styles.OTPCodeContainer}>
          <TextInput style={styles.number} keyboardType="numeric" />
          <TextInput style={styles.number} keyboardType="numeric" />
          <TextInput style={styles.number} keyboardType="numeric" />
          <TextInput style={styles.number} keyboardType="numeric" />
          <TextInput style={styles.number} keyboardType="numeric" />
        </View>

        <View>
          <AppButton
            title="Verify"
            textColor="black"
            onPress={() => navigation.navigate("SuccessfullyScreen")}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.text1}>Didn't receive code? </Text>
          <TouchableOpacity>
            <Text style={styles.text2}>Resend</Text>
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
    alignItems: "center",
    backgroundColor: COLOR.black,
  },
  titleContainer: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
    top: "55%",
    width: "100%",
    flexDirection: "column",
    padding: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 25,
    paddingVertical: 10,
    color: COLOR.middle,
  },
  OTPCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  number: {
    backgroundColor: COLOR.middle,
    color: COLOR.primary,
    width: 55,
    height: 55,
    borderRadius: 10,
    fontSize: 30,
    textAlign: "center",
    opacity: 0.6,
    shadowColor: COLOR.primary,
    shadowOpacity: 60,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 25,
    elevation: 5,
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
export default OtpScreen;
