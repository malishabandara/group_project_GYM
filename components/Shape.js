import React from "react";
import { View, StyleSheet, Image } from "react-native";
import COLOR from "../constants/Color";
import Animated, {
  BounceIn,
  BounceOut,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

function Shape({ image }) {
  return (
    <Animated.View
      entering={FadeInUp.delay(100).springify()}
      style={styles.shape}
    >
      <Image source={image} style={styles.image} className="" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shape: {
    position: "relative",
    flex: 1,
    width: "100%",
    maxHeight: "55%",
    backgroundColor: COLOR.primary,
    borderBottomLeftRadius: 900,
    borderBottomEndRadius: 500,
    borderBottomRadius: 155,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: 300,
    height: 220,
    //backgroundColor: COLOR.primary,
  },
});
export default Shape;
