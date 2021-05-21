import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";

const FindPassword = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}></View>
      <Card style={styles.card}>
        <Text>서비스 준비 중입니다.</Text>
      </Card>
      <View style={styles.container}></View>
    </View>
  );
};

export default FindPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    flex: 1,
    fontSize: 50,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
  },
});
