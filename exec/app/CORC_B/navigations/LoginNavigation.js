import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/Auth/LoginScreen";
import RegistStoreScreen from "../screens/Auth/RegistStore";
import FindPasswordScreen from "../screens/Auth/FindPassword";

const Stack = createStackNavigator();

export default function LoginNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FindPassword"
          component={FindPasswordScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="RegistStore"
          component={RegistStoreScreen}
          options={{
            headerTitle: "가맹점 신청",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
