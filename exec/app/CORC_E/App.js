import React from 'react';
import Navigation from './components/Navigation';
import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import Login from './screens/Login';

export default class extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
