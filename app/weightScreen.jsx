import { View, Text } from "react-native";
import React, { useState } from "react";
import { useToast, Box, Input } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const WeightScreen = () => {
  const [form, setform] = useState({
    age: "",
    weight: "",
    height: "",
  });

  return (
    <SafeAreaView className="flex flex-1 items-center justify-center bg-black w-50">
      <View>
        <Text>weightScreen</Text>
        <View className=" ">
          <Input
            variant="filled"
            placeholder="Age"
            size="lg"
            value={form.age}
            onChangeText={(e) => setform({ ...form, age: e })}
          />
          <Input variant="filled" placeholder="Weight" size="lg" />
          <Input variant="filled" placeholder="Height" size="lg" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WeightScreen;
