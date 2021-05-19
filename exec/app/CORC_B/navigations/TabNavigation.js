import React from "react";
import { Platform } from "react-native";
import MainIcon from "./icons/MainIcon";
import CardIcon from "./icons/CardIcon";
import PaymentHistoryIcon from "./icons/PaymentHistoryIcon";
import SettingsIcon from "./icons/SettingsIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Main from "../screens/Main";
import Payment from "../screens/Payment";
import Settings from "../screens/Settings";
import PaymentHistory from "../screens/PaymentHistory/PaymentHistory";
import Statistics from "../screens/PaymentHistory/Statistics";

import TabBar from "../components/TabBar";

const MainTab = createBottomTabNavigator();

const focusedColor = (focused) => (focused ? "#7986FF" : "#b0b0b0");

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <MainTab.Navigator initialRouteName="Main">
        <MainTab.Screen
          name="Main"
          component={Main}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ focused }) => (
              <MainIcon color={focusedColor(focused)} size="60%" />
            ),
            unmountOnBlur: true,
          }}
        />
        <MainTab.Screen
          name="Payment"
          component={Payment}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ focused }) => (
              <CardIcon color={focusedColor(focused)} size="70%" />
            ),
          }}
        />
        <MainTab.Screen
          name="History"
          component={HistoryNavigator}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ focused }) => (
              <PaymentHistoryIcon color={focusedColor(focused)} size="70%" />
            ),
            unmountOnBlur: true,
          }}
        />
        <MainTab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ focused }) => (
              <SettingsIcon color={focusedColor(focused)} size="70%" />
            ),
          }}
        />
      </MainTab.Navigator>
    </NavigationContainer>
  );
}

const HistoryTab = createMaterialTopTabNavigator();

export const HistoryNavigator = () => {
  return (
    <HistoryTab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="PaymentHistory"
    >
      <HistoryTab.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{ tabBarLabel: "상세 판매 내역" }}
      />
      <HistoryTab.Screen
        name="Statistics"
        component={Statistics}
        options={{ tabBarLabel: "통계" }}
      />
    </HistoryTab.Navigator>
  );
};
