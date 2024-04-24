import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import COLOR from "../config/color";

function Shape({ image }) {
  return (
    <View style={styles.shape}>
      <Image source={image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  shape: {
    position: "relative",
    flex: 0.55,
    width: "100%",
    //marginBottom: 350,
    backgroundColor: COLOR.primary,
    borderBottomLeftRadius: 300,
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
