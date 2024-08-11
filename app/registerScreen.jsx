import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import COLOR from "@/constants/Color";
import Shape from "../components/Shape";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

import { useNavigation } from "@react-navigation/native";

const registerScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex flex-1 items-center flex-col bg-black">
      <StatusBar backgroundColor={COLOR.primary} />
      <Shape
        image={require("../assets/images/RegScreenPic.png")}
        style={{ width: 400, height: 300 }}
      />
      <View className="absolute flex-1 top-2/3 w-full px-5">
        <View className="text-1xl font-title">
          <AppText>Lets Get You Fit</AppText>
          <Text className="text-white font-text text-base my-4 leading-6 tracking-wide ">
            Ready to get fit again? Lets us help you achieve your goal
          </Text>

          <View>
            <AppButton
              title="Register"
              textColor="black"
              onPress={() => navigation.navigate("Register")}
            />
          </View>

          <View className="flex flex-row justify-center my-3 ">
            <Text className="text-1xl font-text text-white">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text className="text-primary font-title">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default registerScreen;
