import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/auth";

const initialState = {
  userId: null,
  email: null,
  token: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        email: action.email,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
