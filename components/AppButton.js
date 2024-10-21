import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import COLOR from "../constants/Color";
import AppText from "./AppText";
import { Link } from "expo-router";

function AppButton({
  title,
  onPress,
  color = "primary",
  textColor = "white",
  imageSource,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: COLOR[color] }]}
      onPress={onPress}
    >
      <Image source={imageSource} style={styles.iconImage} />
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
    marginVertical: 10,
    elevation: 20,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
    color: COLOR.white,
    fontFamily: "Poppins-Regular",
  },
  iconImage: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
});
export default AppButton;
