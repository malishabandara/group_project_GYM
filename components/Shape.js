import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import COLOR from "../constants/Color";
import Animated, {
  BounceIn,
  BounceOut,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

function Shape({ image }) {
  return (
    <Animated.View
      entering={FadeInUp.delay(200).springify()}
      style={styles.shape}
    >
      <Image source={image} style={styles.image} className="" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shape: {
    position: "relative",
    flex: 0.55,
    width: "100%",
    backgroundColor: COLOR.primary,
    borderBottomLeftRadius: 900,
    borderBottomEndRadius: 500,
    borderBottomRadius: 155,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 50,
  },
  image: {
    position: "absolute",
    width: 300,
    height: 220,
    //backgroundColor: COLOR.primary,
  },
});
export default Shape;
