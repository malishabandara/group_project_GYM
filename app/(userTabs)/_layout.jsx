import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
//import { Stack } from "expo-router";

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
          name="UserHome"
          options={{
            title: "UserHome",
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
          name="UserStats"
          options={{
            title: "Userstats",
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
          name="UserPlans"
          options={{
            title: "UserPlans",
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
          name="UserProfile"
          options={{
            title: "UserProfile",
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
