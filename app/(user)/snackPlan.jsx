import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const snackPlan = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Text className="font-pbold">below goes the snack plan</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default snackPlan;
