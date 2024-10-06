import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import COLOR from "@/constants/Color";
import Shape from "../components/Shape";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";

const successScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex flex-1 items-center bg-black">
      <StatusBar backgroundColor={COLOR.primary} />
      <Shape
        image={require("../assets/images/success.png")}
        style={{ width: 400, height: 300 }}
      />

      <View className="absolute flex-1 flex-col justify-center items-center top-2/3 w-3/4 p-5">
        <Text className="text-3xl font-text2 font-semibold text-primary">
          Successfully
        </Text>
        <Text className="my-2 text-lg items-center text-white font-text text-center">
          Your Account has been Created.{" "}
        </Text>

        <View className="w-full m-10">
          <AppButton
            title="OKEY"
            textColor="black"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default successScreen;
