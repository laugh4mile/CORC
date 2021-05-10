import { AsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
// export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;
const SERVER_URL = "http://192.168.0.14:8765/shinhan";

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, email, token, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      email: email,
      token: token,
    });
  };
};

export const registStore = (data) => {
  return async () => {
    // const response = await fetch(
    //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7sXVMkbSY-RS8D2UKd5g2vrhKFackVzg",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //       returnSecureToken: true,
    //     }),
    //   }
    // );
    
    // if (!response.ok) {
    //   const errorResData = await response.json();
    //   const errorId = errorResData.error.message;
    //   let message = "Something went wrong!";
    //   if (errorId === "EMAIL_EXISTS") {
    //     message = "This email exists already!";
    //   }
    //   throw new Error(message);
    // }
    const response = await axios.post(`${SERVER_URL}/store/regist`, JSON.stringify(data));

    console.log(response);
  };
};

export const getSidoList = () => {
  return async () => {
    const response = await axios.get(`${SERVER_URL}/store/sido`)

    return response.data.sido;
  }
}

export const getGugunList = (sidoCode) => {
  return async () => {
    const response = await axios.get(`${SERVER_URL}/store/gugun?sidoCode=${sidoCode}`)

    return response.data.gugun;
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${SERVER_URL}/login/store?email=${email}&password=${password}`
    );

    if (response.data["message"]) {
      let message = response.data["message"];
      throw new Error(`${message}\n아이디와 비밀번호를 확인해 주세요!`);
    }

    // console.log(response.data);
    let userId = response.data["store-storeid"];
    let useremail = response.data["store-email"];
    let token = response.data["auth-token"];

    dispatch(
      authenticate(
        userId,
        useremail,
        token,
        // parseInt(resData.expiresIn) * 1000
        3600 * 1000
      )
    );

    const expirationDate = new Date(
      // new Date().getTime() + parseInt(resData.expiresIn) * 1000
      new Date().getTime() + 360 * 1000
    );
    // saveDataToStorage( userId, email, token, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  // AsyncStorage.removeItem("userData");
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

const saveDataToStorage = (userId, email, token, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId: userId,
      email: email,
      token: token,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
