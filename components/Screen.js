import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";

import COLOR from "../config/color";

function Screen({ children }) {
  return (
    <SafeAreaView style={styles.screen} className="">
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLOR.black,
  },
});
export default Screen;
