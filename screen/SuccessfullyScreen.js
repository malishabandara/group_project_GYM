import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Shape from "../component/Shape";
import COLOR from "../config/color";
import AppButton from "../component/AppButton";

import { useNavigation } from "@react-navigation/native";

function SuccessfullyScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Shape
        image={require("../assets/success.png")}
        style={{ width: 400, height: 300 }}
      />

      <View style={styles.messageContainer}>
        <Text style={styles.title}>Successfully</Text>
        <Text style={styles.subTitle}>Your Account has been Created. </Text>

        <View style={styles.btnContainer}>
          <AppButton
            title="Okey"
            textColor="black"
            onPress={() => navigation.navigate("LoginScreen")}
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
    alignItems: "center",
    backgroundColor: COLOR.black,
  },
  messageContainer: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: "65%",
    width: "70%",
    flexDirection: "column",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: COLOR.white,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    opacity: 0.7,
    color: COLOR.white,
  },
  btnContainer: {
    width: "100%",
    margin: 45,
  },
});
export default SuccessfullyScreen;
