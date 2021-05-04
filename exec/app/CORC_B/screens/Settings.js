import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const Settings = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Setting</Text>
      <Button
        title="Logout"
        backgroundColor={Colors.cancel.backgroundColor}
        fontColor={Colors.cancel.fontColor}
        onPress={() => {
          dispatch(authActions.logout());
        }}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
