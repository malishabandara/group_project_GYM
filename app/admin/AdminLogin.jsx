import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Button, Input } from "@rneui/themed";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <View className="flex flex-1">
      <StatusBar hidden={true} />
      <SafeAreaView className="flex flex-1">
        <Image
          source={require("../../assets/images/loginImage.jpg")}
          className="flex-1 w-full h-full items-center justify-center"
          resizeMode="cover"
        />
      </SafeAreaView>

      <SafeAreaView className="flex flex-1 items-center justify-center bg-black ">
        <View className="rounded-3xl bg-third  border-primary">
          <Text className=" font-title2 text-2xl text-center mt-3">Admin</Text>
          <ScrollView className="mt-2 p-5 w-full ">
            <Input
              label="Email"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
            />
            <Input
              label="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
            />
            <Button
              disabled={loading}
              onPress={() => signInWithEmail()}
              title="LOGIN"
              buttonStyle={{
                backgroundColor: "black",
                borderWidth: 3,
                borderColor: "#f7fde4",
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 5,
              }}
              titleStyle={{ fontWeight: "bold" }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({});
