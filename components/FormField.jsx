import { Text, TextInput, View } from "react-native";
import React from "react";
import { useState } from "react";

import ErrorMessage from "./ErrorMessage";

const FormField = ({ title, value, placeholder, handleChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Text className="text-primary font-2xl font-text mb-2">{title}</Text>

      <View
        style={{
          width: "100%",
          height: 55,
          marginBottom: 15,
          borderWidth: 2,
          borderColor: "#11181C",
          backgroundColor: "#11181C",
          borderRadius: 15,
          paddingHorizontal: 15,
        }}
        className="w-full h-14 border-2 border-primary bg-white rounded px-4"
      >
        <TextInput
          className="flex-1 text-primary "
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
      </View>
    </View>
  );
};

export default FormField;
