import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserDetails from "./component/admin/UserDetails";
import ViewUserDetails from "./component/admin/ViewUserDetails";
import MealPlans from "./component/admin/meal_plans";
import ViewSchedule from "./component/admin/ViewSchedule";
import AddSchedule from "./component/admin/AddSchedule";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserDetails">
        <Stack.Screen name="User Details" component={UserDetails} />
        <Stack.Screen name="Profile" component={ViewUserDetails} />
        <Stack.Screen name="Workouts" component={ViewSchedule} />
        <Stack.Screen name="Meal Plans" component={MealPlans} />
        <Stack.Screen name="Add Schedule" component={AddSchedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
