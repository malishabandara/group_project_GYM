import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserDetails from "./component/admin/UserDetails";
import ViewUserDetails from "./component/admin/ViewUserDetails";
import Schedule from "./component/admin/schedule"; // Adjust the import path as needed
import MealPlans from "./component/admin/meal_plans"; // Adjust the import path as needed

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserDetails">
        <Stack.Screen name="User Details" component={UserDetails} />
        <Stack.Screen name="Profile" component={ViewUserDetails} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="MealPlans" component={MealPlans} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
