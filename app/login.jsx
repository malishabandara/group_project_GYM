import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  AppState,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppFormField from "@/components/AppFormField";
import SubmitButton from "@/components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!error) navigation.navigate("Account");
    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" hidden />
      <ImageBackground
        source={require("../assets/images/loginImage.jpg")}
        resizeMode="cover"
        className="flex-1 "
      >
        <View className="flex flex-col items-center justify-center top-20">
          <Image
            source={require("../assets/images/adminLogin.png")}
            className="w-1/2 h-1/2 z-10"
          />
          <Text className="text-primary text-3xl font-text my-2">Login</Text>
        </View>

        <ScrollView className="flex flex-col p-6">
          <TextInput
            placeholder="Enter Email Address"
            label="Email"
            placeholderTextColor="white"
            className="bg-transparent text-primary leading-3 text-lg w-full h-12 p-1 my-2 border-b-primary border-b-2 font-text"
            value={email}
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Enter Password"
            secureTextEntry={true}
            className="bg-transparent text-primary leading-3 text-lg w-full h-12 p-1 my-2 border-b-primary border-b-2 font-text"
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="white"
            value={password}
          />

          <View className="my-6">
            <Button
              title="Sign in"
              disabled={loading}
              onPress={() => signInWithEmail()}
            />
          </View>

          <View className="flex flex-row items-center justify-center">
            <Text className="text-1xl font-text text-white">
              Already haven't an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
              <Text className="text-1xl font-title1 text-primary">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default login;
