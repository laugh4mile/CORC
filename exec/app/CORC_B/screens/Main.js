import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import Card from '../components/Card';

const Main = () => {
  const userId = useSelector((state) => state.auth.userId);
  const userToken = useSelector((state) => state.auth.token);

  return (
    <View style={styles.container}>
      <Text>메인 페이지</Text>
      <Card><Text>{userId}, {userToken}</Text></Card>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
