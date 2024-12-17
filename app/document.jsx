import React from 'react';
import { StatusBar } from "expo-status-bar";
import { ScrollView, TouchableNativeFeedback, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import CustomButton from "../components/CustomButton";

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', minHeight: '85vh', paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 36, fontFamily: 'Poppins-Black' }}>SOFT and CURVES</Text>
          
          <CustomButton
            title="Go to user dashboard!"
            handlePress={() => router.push('')}
            containerStyles="w-full mt-4"
          />
          
          <TouchableNativeFeedback
            onPress={() =>
              Alert.alert(
                "My Alert",
                "Continues",
                [
                  { text: "Yes", onPress: () => console.log("Yes Pressed") },
                  { text: "No", onPress: () => console.log("No Pressed") }
                ]
              )
            }
          >
            <View style={{ backgroundColor: 'red', borderRadius: 10, padding: 16, width: '100%', marginTop: 16 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>dashboard!</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
