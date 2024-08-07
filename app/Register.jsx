import React, { useState, useEffect } from "react";
import { Alert, View, AppState, StatusBar, Image, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Shape from "@/components/Shape";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Animated, {
  BounceIn,
  BounceOut,
  FadeInDown,
  FadeInUp,
  BounceInRight,
} from "react-native-reanimated";

import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";

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

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      clientId: Constants.manifest2.extra.googleClientId,
      responseType: "token",
      scopes: ["openid", "profile", "email"],
      extraParams: {
        access_type: "offline",
      },
    },
    {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      // Exchange the ID token with Supabase
      supabase.auth
        .signIn({
          provider: "google",
          options: {
            redirectTo: AuthSession.makeRedirectUri({ useProxy: true }),
            scopes: "openid profile email",
          },
        })
        .then(({ data, error }) => {
          if (error) {
            Alert.alert("Error", error.message);
          } else {
            Alert.alert("Success", "You have successfully signed in!");
            console.log(data);
          }
        });
    }
  }, [response]);
  const router = useRouter();

  // const toggleSecureTextEntry = () => {
  //   setSecureTextEntry(!secureTextEntry);
  // };
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  // async function signInWithGoogle() {
  //   const provider = "google";
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider,
  //     options: {
  //       redirectTo: "",
  //     },
  //   });

  //   if (error) {
  //     Alert.alert("Error", error.message);
  //   } else {
  //     Alert.alert("Success", "You have successfully signed in!");
  //     console.log(data);
  //   }
  // }

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

    if (error) Alert.alert(error.message);
    if (!error) router.push("successScreen");
    if (session) Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View className="flex flex-1 bg-primary">
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="flex ">
        {/* header section */}

        <View>
          <TouchableOpacity
            className="rounded-full m-3"
            onPress={() => router.back("registerScreen")}
          >
            <View className="flex flex-row justify-between items-center">
              <AntDesign name="leftcircle" size={30} color="black" />
              <Text className="font-title2 text-2xl">Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* middle image */}
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/Register1.png")}
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
          <View className="flex font-text items-stretch flex-row">
            <Input
              label="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Password"
              autoCapitalize={"none"}
            />
            {/* <TouchableOpacity onPress={toggleSecureTextEntry}>
              {secureTextEntry} ?
              <Icon name={"eye"} size={24} color="gray" />:{" "}
              <Icon name={"eye-off"} size={24} color="gray" />
            </TouchableOpacity> */}
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
              <TouchableOpacity
                className="mx-4 items-center justify-center"
                onPress={() => {
                  promptAsync();
                }}
              >
                <AntDesign name="google" size={35} color="#C7F03C" />
              </TouchableOpacity>
              <TouchableOpacity className="mx-4 items-center justify-center">
                <AntDesign name="facebook-square" size={35} color="#C7F03C" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="flex flex-row items-center justify-center py-3"
            onPress={() => router.push("Login")}
          >
            <Text className="font-text text-sm px-1">
              Already have an Account?
            </Text>
            <Text className="font-title1 text-primary text-base ">Login</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Register;
