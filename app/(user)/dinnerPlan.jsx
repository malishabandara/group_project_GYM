import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const dinnerPlan = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Text className="font-pbold">below goes the dinner plan</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default dinnerPlan;
