// HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { account } from "@/lib/googleSignInConfig";

const HomeScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const jwt = await AsyncStorage.getItem("jwt");
      if (jwt) {
        try {
          await account.get();
          setIsAuthenticated(true);
        } catch {
          navigation.navigate("LoginScreen");
        }
      } else {
        navigation.navigate("LoginScreen");
      }
    };

    checkAuth();
  }, [navigation]);

  const handleLogout = async () => {
    await account.deleteSession("current");
    await AsyncStorage.removeItem("jwt");
    navigation.navigate("LoginScreen");
  };

  if (!isAuthenticated) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
