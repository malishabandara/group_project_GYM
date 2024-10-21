import React from "react";
import { StyleSheet } from "react-native";

import { useFormikContext } from "formik";
import AppButton from "./AppButton";

function SubmitButton({ title, textColor, onPress }) {
  return <AppButton title={title} textColor={textColor} onPress={onPress} />;
}

export default SubmitButton;
