import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

export default function Settings() {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.behind}></View>
      </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
  },
});
