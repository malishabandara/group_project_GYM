// SignInButton.js
import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import client from "../lib/googleSignInConfig";
import { Account } from "react-native-appwrite";

const SignInButton = () => {
  const account = new Account(client);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;

      // Use Appwrite to authenticate with Google
      account
        .createOAuth2Session("google", idToken)
        .then((response) => {
          console.log("Successfully logged in!", response);
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    } catch (error) {
      console.error("Error with Google Sign-In:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignInButton;
