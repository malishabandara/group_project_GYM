import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "../../constants/icons"; // Update the path to your icons accordingly


// TabIcon Component
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-between">

      {/* Icon */}
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        style={{ tintColor: color }} // Dynamic tint color
      />
      {/* Label */}
      <Text
        className={`text-xs ${
          focused ? "font-semibold" : "font-normal"
        } text-center`}
        style={{fontSize: name.length>6 ?11:12,}}
        
        
      >
        {name}
      </Text>
    </View>
  );
};

// UserTabsLayout Component
const UserTabsLayout = () => {
  return (
    <SafeAreaView className="flex-1">
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#C7F03C", // Active tab color
          tabBarInactiveTintColor: "black", // Inactive tab color
          tabBarStyle: {
            backgroundColor:"#FFFFFF",
            borderTopWidth: 0.5,
            height: 60, // Adjusted height
            paddingBottom: 0,
            paddingTop:8
          
          },
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home} // Replace with your home icon
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        {/* Plans Tab */}
        <Tabs.Screen
          name="stats"
          options={{
            title: "stats",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.requests} // Replace with your statics icon
                color={color}
                name="Stats"
                focused={focused}
              />
            ),
          }}
        />

        {/* Messages Tab */}
        <Tabs.Screen
          name="plans"
          options={{
            title: "Plans",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.messages} // Replace with your messages icon
                color={color}
                name="Plans"
                focused={focused}
              />
            ),
          }}
        />




        {/* Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile} // Replace with your profile icon
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default UserTabsLayout;
