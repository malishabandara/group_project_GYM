import { Image, StyleSheet, StatusBar, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import COLOR from "../constants/Color";
import AppButton from "../components/AppButton";
import Shape from "../components/Shape";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Shape
        image={require("../assets/images/splashPic1.png")}
        style={{ width: 400, height: 300 }}
      />

      <Animated.View
        entering={FadeInUp.delay(200).springify()}
        style={styles.headerContainer}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.line1}>Make</Text>
          <Text style={styles.line2}>Yourself Always Fit</Text>
        </View>
        <Text style={styles.description}>
          The best Health and Fitness Center. Build your Health and fitness with
          us.
        </Text>
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={styles.buttonContainer}
        >
          <AppButton
            title="Get Started"
            textColor="black"
            onPress={() => navigation.navigate("Register")}
          />
          <AppButton
            title="Admin"
            color="middle"
            textColor="white"
            onPress={() => navigation.navigate("(admin_tabs)")}
          />
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLOR.black,
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "65%",
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
    width: 350,
    fontSize: 18,
    color: COLOR.text,
    opacity: 0.7,
    lineHeight: 25,
    fontFamily: "Poppins-Medium",
  },
  buttonContainer: {
    bottom: "1%",
    marginTop: 25,
    paddingHorizontal: 15,
    width: "100%",
  },
});
