import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeIcon from './icons/HomeIcon';
import CardIcon from './icons/CardIcon';
import QRCodeIcon from './icons/QRCodeIcon';
import SettingsIcon from './icons/SettingsIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Wallet from './Wallet';
import QR from './QR';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

export default function Footer() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ color }) => (
              <HomeIcon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Card"
          component={Wallet}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ color }) => (
              <CardIcon name="card" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="QR"
          component={QR}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ color }) => (
              <QRCodeIcon name="qr" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: Boolean,
            tabBarIcon: ({ color }) => (
              <SettingsIcon name="settings" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
// <View style={styles.container}>
//   <View style={styles.contents}>
//     <HomeIcon />
//   </View>
//   <View style={styles.contents}>
//     <CardIcon />
//   </View>
//   <View style={styles.contents}>
//     <BarCodeIcon />
//   </View>
//   <View style={styles.contents}>
//     <GearIcon />
//   </View>
// </View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
