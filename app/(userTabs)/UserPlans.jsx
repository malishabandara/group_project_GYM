import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { styled } from 'nativewind'; // Use if you're using nativewind
import CustomButton from "../../components/CustomButton";
import image from "../../assets/body.jpg";
import {Redirect, router} from 'expo-router'
import { SafeAreaView,button } from "react-native-safe-area-context";

const UserPlans = () => {
  const navigation = useNavigation();
  return (


    <ImageBackground
      source={image} // Use the imported image directly
      className="flex-1 justify-center"
    >
      {/* Top Left Button */}
      <View className="absolute top-20 left-6">
        <CustomButton title=" Full body "  handlePress={() => navigation.navigate('../(body)/body')} />
      </View>

      {/* Adjusted Middle-to-Bottom Left Buttons */}

=======
      <View className="flex justify-between absolute  left-5 top-1/2 -translate-y-1/4 h-1/3 ">

        <CustomButton title="      Arm        "  handlePress={() =>navigation.navigate ('')} />
        <CustomButton title=" Belly  "  handlePress={() => navigation.navigate('')} />
        <CustomButton title="BUtt"  handlePress={() => navigation.navigate('')} />
        <CustomButton title="Leg"  handlePress={() => navigation.navigate('')} />
      </View>

      {/* Message Text */}
      <Text className="absolute bottom-5 text-white text-lg font-bold">
     
      </Text>
    </ImageBackground>
  );
};

export default UserPlans;
