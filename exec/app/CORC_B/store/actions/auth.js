import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URL } from "../../env";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const checkEmail = (email) => {
  return async () => {
    const response = await axios.post(
      `${SERVER_URL}/store/check/email?email=${email}`
    );
    return response.data;
  };
};

export const registStore = (data) => {
  return async () => {
    try {
      await axios.post(`${SERVER_URL}/store/regist`, data);
    } catch (e) {
      let errorStatus = e.response.status;
      if (errorStatus && errorStatus === 401) {
        throw new Error("이미 등록된 가맹점입니다.");
      }
      if (errorStatus && errorStatus === 500) {
        throw new Error("가맹점 신청에 실패하였습니다. ");
      }
    }
  };
};

export const getSidoList = () => {
  return async () => {
    const response = await axios.get(`${SERVER_URL}/store/sido`);

    return response.data.sido;
  };
};

export const getGugunList = (sidoCode) => {
  return async () => {
    const response = await axios.get(
      `${SERVER_URL}/store/gugun?sidoCode=${sidoCode}`
    );

    return response.data.gugun;
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    var response;
    try {
      response = await axios.post(
        `${SERVER_URL}/login/store?email=${email}&password=${password}`
      );
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error(`아이디와 비밀번호를 확인해 주세요!`);
      }
      throw new Error("로그인 시도 중 에러가 발생하였습니다.");
    }

    let userId = response.data["store-storeid"];
    let token = response.data["auth-token"];
    let accepted = response.data["store-accepted"];

    let _6months = 60 * 24 * 30 * 6;

    if (accepted === 0) {
      throw new Error("가맹점 승인이 거절되었습니다. 확인해 주세요");
    }
    if (accepted === 1) {
      throw new Error("가맹점 승인이 완료되지 않았습니다.");
    }

    dispatch(authenticate(userId, token, _6months * 1000));

    const expirationDate = new Date(new Date().getTime() + _6months * 1000);

    saveDataToStorage(userId, token, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
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

const saveDataToStorage = (userId, token, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId: userId,
      token: token,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
