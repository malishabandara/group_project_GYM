import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import COLOR from "../constants/Color";
import AppText from "./AppText";
import { Link } from "expo-router";

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
    fontFamily: "Poppins-Regular",
  },
});
export default AppButton;
