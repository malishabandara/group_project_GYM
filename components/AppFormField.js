import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, title, handleChangeText, ...otherProps }) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {/* //<Text className="text-primary font-text text-2xl mb-1">{title}</Text> */}
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChangeText}
        secureTextEntry={name === "password" && !showPassword}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visiable={touched[name]} />
    </>
  );
}

export default AppFormField;
