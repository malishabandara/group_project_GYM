import { StyleSheet, Text, View, Button,Image } from "react-native";
import React from "react";
import { Redirect, useRouter } from "expo-router";


const index = () => {
  return <Redirect href={'/SplashScreen'} />
};

export default index;
