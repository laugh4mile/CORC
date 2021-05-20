import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FindPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.wating}>서비스 준비중 입니다!</Text>
    </View>
  );
};

export default FindPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wating: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
