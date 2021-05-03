import { StatusBar } from "expo-status-bar";
import React from "react";
import Constants from 'expo-constants';
import { StyleSheet, View, Platform } from "react-native";
import TabNavigation from './navigations/TabNavigation'
import LoginNavigation from './navigations/LoginNavigation'

export default function App() {
  return (
    <View style={styles.container}>
      {/* 로그인 전이라면 Login 페이지,
          로그인 후 TabNav */}
      <LoginNavigation />
      {/* <TabNavigation /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
  },
});
