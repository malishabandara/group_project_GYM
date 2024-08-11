import React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import UserDetails from "./component/admin/UserDetails";
import ViewUserDetails from "./component/admin/ViewUserDetails";
import MealPlans from "./component/admin/meal_plans";
import ViewSchedule from "./component/admin/ViewSchedule";
import AddSchedule from "./component/admin/AddSchedule";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function UserStackScreen() {
  return (
    <Stack.Navigator initialRouteName="UserDetails">
      <Stack.Screen name="User Details" component={UserDetails} />
      <Stack.Screen name="Profile" component={ViewUserDetails} />
      <Stack.Screen name="Workouts" component={ViewSchedule} />
      <Stack.Screen name="Meal Plans" component={MealPlans} />
      <Stack.Screen name="Add Schedule" component={AddSchedule} />
    </Stack.Navigator>
  );
}

function NotificatoinStackScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🔔▬▬ι═══════ﺤ🔔</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>😎😎</Text>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="UserDetails">
      <Tab.Screen name="Users" component={UserStackScreen} 
        options={{
          headerShown: false,
          tabBarLabel:'Home',
          tabBarIcon: ({color, size}) => <AntDesign name="home" size={24} color="black" />,
          tabBarLabelStyle: {
            fontSize: 11,
          }
        }}
      />
      <Tab.Screen name="Notifications" component={NotificatoinStackScreen} 
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size}) => <Ionicons name="notifications-outline" size={24} color="black" />,
        }}
      />
      <Tab.Screen name="Profile" component={SettingsScreen} 
        options={{
          tabBarLabel:'Profile',
          tabBarIcon: ({color, size}) => <FontAwesome name="user-o" size={24} color="black" />,
          tabBarLabelStyle: {
            fontSize: 11,
          }
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Add Schedule" component={AddSchedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;