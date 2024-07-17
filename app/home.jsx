import { View, Text, Button, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { account } from "@/lib/appwrite";
import { router } from "expo-router";

const home = () => {
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      console.log("Successfully Logout!!");
      ToastAndroid.show("Please fill the all fields ", ToastAndroid.SHORT);
      router.back("./index");
    } catch (error) {
      console.log("Logout Failed ", error);
    }
  };
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <Text>home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default home;
