import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  AppState,
  StatusBar,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const router = useRouter();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          email,
        },
      },
    });

    console.log("Session: ", session);
    console.log("Error: ", error);
    console.log(email, password);

    if (session) {
      Alert.alert("Please check your inbox for email verification!");
      if (!error) router.push("successScreen");
    } else {
      if (error) Alert.alert(error.message);
      router.replace("Register");
    }
    setLoading(false);
  }

  return (
    <View className="flex flex-1 bg-primary">
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView className="flex ">
        {/* Header Section */}
        <View>
          <TouchableOpacity
            className="rounded-full m-5"
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <View className="flex flex-row justify-between items-center">
              <AntDesign name="leftcircle" size={30} color="black" />
              <Text className="font-title2 text-2xl">Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Middle Image */}
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/Register1.png")}
            className="w-[200] h-[200] m-2 items-center justify-center"
          />
        </View>
      </SafeAreaView>

      {/* Form Container */}
      <Animated.View
        eentering={FadeInDown.delay(300).springify()}
        className="flex-1 bg-third px-2 mt-3 pt-2 rounded-tl-[50] rounded-tr-[50] z-10"
      >
        <ScrollView className="my-5 p-3">
          <View className="font-text items-stretch">
            <Input
              label="Email"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
            />
          </View>
          <View className="font-text items-stretch">
            <Input
              label="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Password"
              autoCapitalize={"none"}
              secureTextEntry
            />
          </View>
          <View>
            <Button
              disabled={loading}
              onPress={() => signUpWithEmail()}
              title="SIGN UP"
              buttonStyle={{
                backgroundColor: "black",
                borderWidth: 3,
                borderColor: "#f7fde4",
                borderRadius: 30,
              }}
              containerStyle={{
                width: windowWidth * 0.5,
                alignSelf: "center",
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: "bold" }}
            />
          </View>

          {/* social links container
          <View className="flex flex-col items-center justify-center">
            <View className="flex flex-row items-center justify-center">
              <Text className="px-2">----------------</Text>
              <Text className="text-lg font-title1">Or</Text>
              <Text className="px-2">----------------</Text>
            </View>

            <View className="flex flex-row justify-between items-center ">
              <TouchableOpacity className="mx-4 items-center justify-center">
                <AntDesign name="google" size={35} color="#C7F03C" />
              </TouchableOpacity>
              <TouchableOpacity className="mx-4 items-center justify-center">
                <AntDesign name="facebook-square" size={35} color="#C7F03C" />
              </TouchableOpacity>
            </View>
          </View> */}

          <TouchableOpacity
            className="flex flex-row items-center justify-center py-3"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="font-text text-sm px-1">
              Already have an Account?
            </Text>
            <Text className="font-title1 text-primary text-base ">Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Register;
