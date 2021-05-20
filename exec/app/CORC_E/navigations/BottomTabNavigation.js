import React from 'react';
import HomeIcon from '../components/icons/HomeIcon';
import CardIcon from '../components/icons/CardIcon';
import QRCodeIcon from '../components/icons/QRCodeIcon';
import UserIcon from '../components/icons/UserIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Wallet from '../screens/Wallet';
import QR from '../screens/QRScan';
import Settings from '../screens/Settings';
import TabBar from '../components/TabBar';
import Statistics from '../screens/Statistics';

const Tab = createBottomTabNavigator();

export default function Footer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: { borderTopWidth: 0 },
          style: {
            borderTopWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            marginBottom: 10,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ color }) => (
              <HomeIcon name="home" color={color} size={30} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="TopNavigator"
          component={TopNavigator}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ color }) => (
              <CardIcon name="card" color={color} size={30} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="QR"
          component={QR}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ color }) => (
              <QRCodeIcon name="qr" color={color} size={30} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ color }) => (
              <UserIcon name="settings" color={color} size={28} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const TopTab = createMaterialTopTabNavigator();

export const TopNavigator = () => {
  return (
    <TopTab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Wallet"
    >
      <TopTab.Screen
        name="Wallet"
        component={Wallet}
        options={{ tabBarLabel: '상세 이용 내역' }}
      />
      <TopTab.Screen
        name="Statistics"
        component={Statistics}
        options={{ tabBarLabel: '통계' }}
      />
    </TopTab.Navigator>
  );
};
