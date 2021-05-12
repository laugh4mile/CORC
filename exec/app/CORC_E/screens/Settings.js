import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const Settings = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
  },
});
