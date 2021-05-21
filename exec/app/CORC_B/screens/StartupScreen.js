import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { userId, token, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDidTryAL());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expirationTime));
    })();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary.backgroundColor} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
