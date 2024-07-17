// // HomeScreen.js
// import React, { useEffect, useState } from "react";
// import { View, Text, Button } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { account } from "@/lib/googleSignInConfig";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const jwt = await AsyncStorage.getItem("jwt");
//       if (jwt) {
//         try {
//           await account.get();
//           setIsAuthenticated(true);
//         } catch {
//           navigation.navigate("login");
//         }
//       } else {
//         navigation.navigate("home");
//       }
//     };

//     checkAuth();
//   }, [navigation]);

//   const handleLogout = async () => {
//     await account.deleteSession("current");
//     await AsyncStorage.removeItem("jwt");
//     navigation.navigate("login");
//   };

//   if (!isAuthenticated) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <SafeAreaView className="flex flex-1 items-center justify-center ">
//       <Text className="text-black">Welcome to the Home Screen!</Text>
//       <Button title="Logout" onPress={handleLogout} />
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
//import { account, client } from "../lib/appwrite";
import { Account, Client } from "react-native-appwrite";

const home = () => {
  useEffect(() => {
    getAccont();
  });

  const getAccont = async () => {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("668a3ce4003a62ae0963"); // Your project ID

    const account = new Account(client);

    const result = await account.get();

    //console.log(result);
    console.log(JSON.stringify(result));
    //return result;
  };
  //const account = new Account(client);
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <Text>home</Text>
    </SafeAreaView>
  );
};

export default home;
