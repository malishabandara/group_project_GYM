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
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppFormField from "@/components/AppFormField";
import SubmitButton from "@/components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

import FormField from "../components/FormField";
import { createUser, signIn } from "../lib/appwrite";

const login = () => {
  const navigation = useNavigation();

  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      // Toast.show({
      //   type: "error",
      //   text1: "Isuru",
      //   text2: "Please fill the all fields",
      // });
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      console.log("Logged");
      router.replace("./home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "`${error.message}`",
      });
      Alert.alert("Error ", error.message);
    } finally {
      setIsSubmitting(false);
    }
    //createUser();
  };

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
            placeholderTextColor="white"
            className="bg-transparent text-primary leading-3 text-lg w-full h-12 p-1 my-2 border-b-primary border-b-2 font-text"
            value={form.email !== "" && form.email}
            onChangeText={(e) => setform({ ...form, email: e })}
            keyboardType="email-address"
            v
            c
          />
          <TextInput
            placeholder="Enter Password"
            secureTextEntry
            className="bg-transparent text-primary leading-3 text-lg w-full h-12 p-1 my-2 border-b-primary border-b-2 font-text"
            placeholderTextColor="white"
            value={form.password !== "" && form.password}
            onChangeText={(e) => setform({ ...form, password: e })}
          />

          <View className="my-6">
            <SubmitButton
              title="Login"
              textColor="black"
              onPress={handleSubmit}
              isLoading={isSubmitting}
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
