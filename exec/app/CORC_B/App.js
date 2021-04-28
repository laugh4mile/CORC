import { StatusBar } from "expo-status-bar";
import React from "react";
import Constants from 'expo-constants';
import { StyleSheet, View, Platform } from "react-native";
import Login from "./screens/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
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
