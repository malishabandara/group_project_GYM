import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import COLOR from "../config/color";
import AppText from "./AppText";

function AppButton({ title, onPress, color = "primary", textColor = "white" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: COLOR[color] }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: COLOR[textColor] }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.primary,
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
    color: COLOR.white,
  },
});
export default AppButton;
