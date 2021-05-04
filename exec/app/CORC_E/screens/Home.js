import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getUser() {
  const userData = await AsyncStorage.getItem('userData');
  return userData;
}

export default function Home() {
  const user = getUser();
  // console.log(user);
  // console.log('userData : ', AsyncStorage.getItem('userData'));
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text>여기가 홈이다 </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});
