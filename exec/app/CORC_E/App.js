import React from 'react';
import Navigation from './components/Navigation';
import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';

export default class extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
  },
});
