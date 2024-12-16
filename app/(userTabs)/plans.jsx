import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styled } from 'nativewind'; // Use if you're using nativewind
import CustomButton from "../../components/CustomButton";
import image from "../../assets/body.jpg";
import {Redirect, router} from 'expo-router'
import { SafeAreaView,button } from "react-native-safe-area-context";

const Plans = () => {
  return (
    <ImageBackground
      source={image} // Use the imported image directly
      className="flex-1 justify-center"
    >
      {/* Top Left Button */}
      <View className="absolute top-20 left-6">
        <CustomButton title=" Full body "  handlePress={() => router.push('../(body)/body')} />
      </View>

      {/* Adjusted Middle-to-Bottom Left Buttons */}

=======
      <View className="flex justify-between absolute  left-5 top-1/2 -translate-y-1/4 h-1/3 ">

        <CustomButton title="      Arm        "  handlePress={() => router.push('/home')} />
        <CustomButton title=" Belly  "  handlePress={() => router.push('/home')} />
        <CustomButton title="BUtt"  handlePress={() => router.push('/home')} />
        <CustomButton title="Leg"  handlePress={() => router.push('/home')} />
      </View>

      {/* Message Text */}
      <Text className="absolute bottom-5 text-white text-lg font-bold">
     
      </Text>
    </ImageBackground>
  );
};

export default Plans;
