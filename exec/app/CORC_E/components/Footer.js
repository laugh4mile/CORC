import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text>홈</Text>
      </View>
      <View style={styles.contents}>
        <Text>이용 내역</Text>
      </View>
      <View style={styles.contents}>
        <Text>QR 스캔</Text>
      </View>
      <View style={styles.contents}>
        <Text>사용자 정보</Text>
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
