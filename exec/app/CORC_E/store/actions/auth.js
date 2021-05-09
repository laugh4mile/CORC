import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
// export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;
const SERVER_URL = 'http://192.168.219.102:8765/shinhan';

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
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

    console.log('response');
  };
};

export const login = (email, password) => {
  console.log(email, password);
  return async (dispatch) => {
    const response = await axios.post(
      `${SERVER_URL}/login/user?email=${email}&password=${password}`
    );
    console.log('response');
    if (response.data['message']) {
      let message = response.data['message'];
      throw new Error(`${message}\n아이디와 비밀번호를 확인해 주세요!!`);
    }
    let token = response.data['auth-token'];
    let userid = response.data['user-userid'];
    // let email = response.data['user-email'];
    dispatch(
      authenticate(
        userid,
        token,
        // parseInt(resData.expiresIn) * 1000
        3600
      )
    );
    const expirationDate = new Date(
      // new Date().getTime() + parseInt(resData.expiresIn) * 1000
      new Date().getTime() + 360 * 1000
    );
    saveDataToStorage(token, userid, expirationDate);
  };
};

export const autologin = (data) => {
  return (dispatch) => {
    let token = data['token'];
    let userid = data['userId'];
    dispatch(
      authenticate(
        userid,
        token,
        // parseInt(resData.expiresIn) * 1000
        3600
      )
    );
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
