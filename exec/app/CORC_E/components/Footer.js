import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeIcon from './icons/HomeIcon';
import CardIcon from './icons/CardIcon';
import BarCodeIcon from './icons/BarCodeIcon';
import GearIcon from './icons/GearIcon';

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <HomeIcon />
      </View>
      <View style={styles.contents}>
        <CardIcon />
      </View>
      <View style={styles.contents}>
        <BarCodeIcon />
      </View>
      <View style={styles.contents}>
        <GearIcon />
      </View>
    </View>
  );
}

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
