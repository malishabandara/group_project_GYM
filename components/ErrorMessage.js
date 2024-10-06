import React from "react";
import { StyleSheet } from "react-native";

import AppText from "./AppText";
import COLOR from "../constants/Color";

function ErrorMessage({ error, visiable }) {
  if (!visiable && !error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: COLOR.primary,
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});
export default ErrorMessage;
