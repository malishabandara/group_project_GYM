import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import COLOR from "../config/color";
import Card from "../component/Card";
import Shape from "../component/Shape";
function AdminScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Shape image={require("../assets/adminPic1.png")} />
      <View style={styles.cardContainer}>
        <Card />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //position: "relative",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLOR.black,
  },
  cardContainer: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    zIndex: -1,
    backgroundColor: COLOR.middle,
    width: "90%",
    top: "30%",
    height: 420,
    borderRadius: 15,
    opacity: 0.9,
    shadowColor: COLOR.primary,
    shadowOpacity: 90,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 25,
    elevation: 15,
  },
});
export default AdminScreen;
