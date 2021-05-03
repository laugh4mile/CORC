import React from "react";
import MainIcon from "./icons/MainIcon";
import CardIcon from "./icons/CardIcon";
import PaymentHistoryIcon from "./icons/PaymentHistoryIcon";
import SettingsIcon from "./icons/SettingsIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Main from "../screens/Main";
import Payment from "../screens/Payment";
import PaymentHistory from "../screens/PaymentHistory";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

const focusedColor = (focused) => (focused ? "#7986FF" : "#b0b0b0");

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Main">
        <Tab.Screen
          name="Main"
          component={Main}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ focused }) => (
              <MainIcon color={focusedColor(focused)} size="60%" />
            ),
          }}
        />
        <Tab.Screen
          name="Payment"
          component={Payment}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ focused }) => (
              <CardIcon color={focusedColor(focused)} size="70%" />
            ),
          }}
        />
        <Tab.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ focused }) => (
              <PaymentHistoryIcon color={focusedColor(focused)} size="70%" />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ focused }) => (
              <SettingsIcon color={focusedColor(focused)} size="70%" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
