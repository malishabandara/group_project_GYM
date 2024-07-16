import React from "react";
import { Text, Platform, StyleSheet } from "react-native";
import COLOR from "../constants/Color";

function AppText({ children, ...otherProps }) {
  return (
    <Text style={styles.text} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    //fontFamily: Platform.OS === "android" ? "Avenir" : "Avenir",
    fontWeight: "800",
    color: COLOR.text,
  },
});
export default AppText;
