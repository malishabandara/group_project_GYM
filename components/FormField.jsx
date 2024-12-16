<<<<<<< HEAD
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
=======
import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({title, value, placeholder,handleChangeText,otherStyles,containerStyles, ...props }) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium" >{title}</Text>

      <View className={` border-2 border-gray-400 w-full h-14 px-4 rounded-2xl focus:border-primary justify-center ${containerStyles}`}>
        <TextInput
          className="flex-1 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#c5c6d0"
          onChangeText={handleChangeText}
          multiline={true}
          
        />
      </View>
    </View>
  ) 
}

export default FormField
>>>>>>> kasun2
