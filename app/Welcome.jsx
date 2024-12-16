import { View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import Shape from "../components/Shape";
import { Link } from "expo-router";
import { Button } from "@rneui/themed";
import Animated, {
  BounceIn,
  BounceOut,
  FadeInDown,
  FadeInUp,
  BounceInRight,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const Welcome = () => {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex flex-1 bg-black">
      <StatusBar barStyle={"dark-content"} backgroundColor="#C7F03C" />
      <Shape image={require("../assets/images/RegScreenPic.png")} />
      <Animated.View
        entering={BounceIn.delay(300).springify()}
        className="flex flex-1 absolute bottom-20 w-30 m-2 p-3  h-50"
      >
        <Text className="bg-slate-300 text-white font-title2 mx-3 text-3xl my-5">
          Welcome
        </Text>
        <Text className="font-title2 text-primary text-base mx-3 mb-3">
          Your fitness journey starts here, and we're thrilled to be a part of
          it.
        </Text>
        <View className="w-full items-center h-50 ">
          <Button
            title="Continue"
            buttonStyle={{
              backgroundColor: "black",
              borderWidth: 2,
              borderColor: "#C7F03C",
              borderRadius: 30,
            }}
            containerStyle={{
              width: 300,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
            titleStyle={{ fontWeight: "bold" }}
            onPress={() => navigation.navigate("SplashScreen")}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Welcome;
