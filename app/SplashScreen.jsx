import {
  Image,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import Animated, {
  BounceIn,
  BounceOut,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import COLOR from "../constants/Color";
import AppButton from "../components/AppButton";
import Shape from "../components/Shape";

export default function SplashScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#C7F03C" />

      <Shape image={require("../assets/images/splashPic1.png")} />

      <Animated.View
        entering={FadeInUp.delay(300).springify()}
        style={styles.headerContainer}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Text style={styles.line1}>Make</Text>
          <Text style={styles.line2}>Yourself Always Fit</Text>
        </View>
        <Text style={styles.description}>
          The best Health and Fitness Center.Build your Health and fitness with
          us.
        </Text>
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={styles.buttonContainer}
        >
          <AppButton
            title="Get Started"
            textColor="black"
            imageSource={require("../assets/images/fit.png")}
            onPress={() => navigation.navigate("LogRoute")}
          />
        </Animated.View>
      </Animated.View>

      <TouchableOpacity
        onPress={() => navigation.navigate("/HomeAdmin")}
        className="flex items-center justify-center"
      >
        <Text className="text-white text-sm underline font-title2">Admin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLOR.black,
    width: "100%",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  line1: {
    color: COLOR.primary,
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    marginHorizontal: 5,
  },
  line2: {
    color: COLOR.white,
    fontSize: 25,
    fontFamily: "Poppins-Light",
  },
  description: {
    textAlign: "center",
    marginTop: 5,
    width: 300,
    fontSize: 18,
    color: COLOR.text,
    opacity: 0.7,
    lineHeight: 25,
    fontFamily: "Poppins-Medium",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
  },
});
