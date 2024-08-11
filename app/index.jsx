import { StyleSheet, Text, View, Button,Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";

const index = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <Image source={require("../assets/images/dumbell.svg")}/>
      <Button title={"Welcome"} onPress={() => router.push("Welcome")} />
    </ScreenWrapper>
    
  );
};

export default index;
