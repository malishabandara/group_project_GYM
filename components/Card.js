import React from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import COLOR from "../config/color";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";

function Card() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.card}
    >
      <AppText style={styles.title}>Admin</AppText>
      <AppTextInput placeholder="User Name" />
      <AppTextInput placeholder="Password" type="Password" icon="true" />
      <AppButton
        title="Login"
        color="primary"
        textColor="black"
        style={styles.button}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 25,
    color: COLOR.primary,
    marginBottom: 15,
    fontWeight: "800",
  },
  button: {
    marginTop: 10,
  },
});
export default Card;
