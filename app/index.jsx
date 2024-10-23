import { StyleSheet, Text, Image, ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter, Redirect } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("Welcome");
    }, 3000); // Change the delay time if needed

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Loading.png")}
        style={styles.icon}
      />
      <Text className="text-white font-text text-1xl">Loading FlexFlow...</Text>
      <ActivityIndicator size="large" color="#C7F03C" style={styles.loader} />
      <Redirect href={"/SplashScreen"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000", // You can change the background color
  },
  icon: {
    width: 400,
    height: 400,
  },
  loader: {
    width: 100,
    height: 100,
  },
});
export default index;
