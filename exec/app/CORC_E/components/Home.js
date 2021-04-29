import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from './Footer';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text>여기가 홈이다</Text>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contents: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
  },
});
