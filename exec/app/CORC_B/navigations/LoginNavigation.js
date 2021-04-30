import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import RegistStore from "../screens/RegistStore";
import FindPassword from "../screens/FindPassword";

const Stack = createStackNavigator();

export default function LoginNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FindPassword"
          component={FindPassword}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="RegistStore"
          component={RegistStore}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
