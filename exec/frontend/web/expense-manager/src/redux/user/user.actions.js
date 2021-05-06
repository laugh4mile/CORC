import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const signIn = (email, password) => {
  return {
    type: UserActionTypes.LOGIN,
    promise: {
      method: "post",
      url: `/web?email=${email}&password=${password}`,
    },
  };
};

export const signInStart = (emailAndPassword) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});
