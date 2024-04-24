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
      <Image style={styles.image} />
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
  },

  image: {
    width: 150,
    height: 150,
  },
});
export default Card;
