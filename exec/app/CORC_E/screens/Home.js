import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';

export default function Home() {
  const userId = useSelector((state) => state.auth.userId);
  console.log('userId는??? : ', userId);
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
