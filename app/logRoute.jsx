import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  AppState,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { supabase } from "../lib/supabase";

import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Toast } from "native-base";

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();
console.log({ redirectTo });

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const createSessionFromUrl = async (url) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  console.log("session", data.session);
  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    console.log("successURL", url);
    await createSessionFromUrl(url);
  }
};

const performOAuth2 = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    console.log("successURL", url);
    await createSessionFromUrl(url);
  } else {
    console.error("Failed to open auth session", res);
  }
};

const LogRoute = () => {
  const navigation = useNavigation();
  // Handle linking into app from email app.
  const url = Linking.useURL();
  console.log({ url });
  if (url) createSessionFromUrl(url);

  return (
    <SafeAreaView className="flex-1 items-center justify-center ">
      <StatusBar barStyle={"light-content"} backgroundColor={"#000000"} />
      <View className="flex w-full h-full">
        <TouchableOpacity
          className="rounded-full m-5 absolute"
          onPress={() => router.back("Register")}
        >
          <View className="flex flex-row justify-between items-center absolute">
            <AntDesign name="leftcircle" size={30} color="white" />
            <Text className="font-title2 text-2xl">Sign In</Text>
          </View>
        </TouchableOpacity>
        <Image
          source={require("../assets/images/logBack.jpg")}
          resizeMode="cover"
          className="absolute w-full h-full object-cover blur-lg scale-110"
        />
        <View className="flex-1 items-center justify-center mx-5 top-32 bg-gradient-to-t from-black/100 via-black/90 to-black/60">
          <Text className="text-third font-title1 text-4xl">Lets you in</Text>
          <Text className="text-text font-title2  text-2xl mt-4">
            Unlock all your possibilities
          </Text>
          <AppButton
            title="Sign up with email"
            textColor="white"
            color="middle"
            imageSource={require("../assets/images/email.png")}
            onPress={() => navigation.navigate("RegisterScreen")}
          />
          <Text className="text-third font-title1 text-1xl mx-2">Or</Text>
          <AppButton
            title="Sign in with Facebook"
            textColor="black"
            color="blue"
            imageSource={require("../assets/images/facebook.png")}
            onPress={performOAuth2}
          />
          <AppButton
            title="Sign in with Google"
            textColor="black"
            color="secondary"
            imageSource={require("../assets/images/google.png")}
            onPress={performOAuth}
          />
          <View className="flex flex-row justify-center my-3 ">
            <Text className="text-1xl font-text text-white">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-primary font-title1">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogRoute;
