import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SERVER_URL from '../../env';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async () => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7sXVMkbSY-RS8D2UKd5g2vrhKFackVzg',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${SERVER_URL}/login/user?email=${email}&password=${password}`
    );
    if (response.data['message']) {
      let message = response.data['message'];
      throw new Error(`${message}\n아이디와 비밀번호를 확인해 주세요!!`);
    }
    let token = response.data['auth-token'];
    let userid = response.data['user-userid'];
    dispatch(authenticate(userid, token, 3600));
    const expirationDate = new Date(new Date().getTime() + 360 * 1000);
    saveDataToStorage(token, userid, expirationDate);
  };
};

export const autologin = (data) => {
  return (dispatch) => {
    let token = data['token'];
    let userid = data['userId'];
    dispatch(authenticate(userid, token, 3600));
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
