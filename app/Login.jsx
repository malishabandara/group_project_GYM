import React, { useState } from "react";
import {
  Alert,
  View,
  AppState,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  BounceIn,
  BounceOut,
  FadeInDown,
  FadeInUp,
  BounceInRight,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // console.log("Session: ", session);
    // console.log("Error: ", error);

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <View className="flex flex-1 bg-primary">
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="flex ">
        {/* header section */}

        <View>
          <TouchableOpacity
            className="rounded-full m-5"
            onPress={() => router.back("Register")}
          >
            <View className="flex flex-row justify-between items-center">
              <AntDesign name="leftcircle" size={30} color="black" />
              <Text className="font-title2 text-2xl">Sign In</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* middle image */}
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/Login.png")}
            className="w-[200] h-[200] m-2 items-center justify-center"
          />
        </View>
      </SafeAreaView>

      {/* form container */}
      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        className="flex-1 bg-third px-2 mt-3 pt-2 rounded-tl-[50] rounded-tr-[50] z-10"
      >
        <View className="my-5 p-5">
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
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
            />
          </View>

          <View>
            <Button
              disabled={loading}
              onPress={() => signInWithEmail()}
              title="LOGIN"
              buttonStyle={{
                backgroundColor: "black",
                borderWidth: 3,
                borderColor: "#f7fde4",
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 5,
              }}
              titleStyle={{ fontWeight: "bold" }}
            />
          </View>

          {/* social links container */}
          <View className="flex flex-col mt-3 items-center justify-center">
            <View className="flex flex-row items-center justify-center">
              <Text className="px-2">----------------</Text>
              <Text className="text-lg font-title1">Or</Text>
              <Text className="px-2">----------------</Text>
            </View>

            <View className="flex flex-row justify-between items-center mt-4">
              <TouchableOpacity className="mx-4 items-center justify-center">
                <AntDesign name="google" size={35} color="#C7F03C" />
              </TouchableOpacity>
              {/* <googleSign /> */}
              <TouchableOpacity className="mx-4 items-center justify-center">
                <AntDesign name="facebook-square" size={35} color="#C7F03C" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="flex flex-row items-center justify-center py-3"
            onPress={() => router.push("Register")}
          >
            <Text className="font-text text-sm px-1">
              Already haven't an Account?
            </Text>
            <Text className="font-title1 text-primary text-base ">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Login;
