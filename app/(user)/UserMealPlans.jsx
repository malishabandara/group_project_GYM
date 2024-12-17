import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import { Redirect, router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const UserMealPlans = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="m-3">
      <ScrollView>
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-pbold">Hey Jane,</Text>

            <Text className="text-base font-pregular">
              Here are your meal plans
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("(userTabs)/UserProfile")}>
            <Image className="w-16 h-16 rounded-full" source={images.girl} />
          </TouchableOpacity>
        </View>

        <View className="border-t border-gray-300 mt-2 mb-3"></View>

        <View className="flex-row m-2 mb-3 justify-between">
          <TouchableOpacity onPress={() => navigation.navigate("(user)/breakfastPlan")}>
            <Image
              className="w-40 h-40 rounded-xl shadow-xl"
              source={images.breakfast}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("(user)/lunchPlan")}>
            <Image
              className="w-40 h-40 rounded-xl shadow-xl"
              source={images.lunch}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row m-2 justify-between">
          <TouchableOpacity onPress={() => navigation.navigate("(user)/dinnerPlan")}>
            <Image
              className="w-40 h-40 rounded-xl shadow-xl"
              source={images.dinner}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("(user)/snackPlan")}>
            <Image
              className="w-40 h-40 rounded-xl shadow-xl"
              source={images.snacks}
            />
          </TouchableOpacity>
        </View>

        <View className="m-3">
          <Text className="font-pregular text-base">
            Do you have any concerns regarding your meal plan?
          </Text>
          <CustomButton
            title="Contact Coach"
            handlePress={() => navigation.navigate("../(user)/contactCoach")}
            containerStyles="m-3 "
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserMealPlans;
