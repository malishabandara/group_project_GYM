import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { color } from "@rneui/themed/dist/config";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="HomeAdmin"
        options={{
          title: "DASHBOARD",
          headerStyle: {
            backgroundColor: "#764ABC",
          },
          headerTintColor: "#F8F9FB",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notification"
        options={{
          tabBarLabel: "Notifications",
          headerStyle: {
            backgroundColor: "#764ABC",
          },
          headerTintColor: "#F8F9FB",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
