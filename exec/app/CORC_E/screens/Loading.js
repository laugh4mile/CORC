import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.text}>로딩 화면~</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: '#fdf6aa',
  },
  text: {
    color: '#2c2c2c',
    fontSize: 30,
  },
});

export default Loading;
