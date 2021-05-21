import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoginNavigation from './LoginNavigation';
import BottomTabNavigation from './BottomTabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../store/actions/auth';

const Navigation = (props) => {
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      saveUserInfo(data);
    } catch (error) {}
  };

  const saveUserInfo = async (data) => {
    let action = authActions.autologin(data);
    try {
      await dispatch(action);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <>
      {!isAuth && <LoginNavigation />}
      {isAuth && <BottomTabNavigation />}
    </>
  );
};

export default Navigation;
