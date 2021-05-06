import { createSelector } from "reselect";

const selectUser = (state) => state.user;
// const selectCart = (state) => state.cart;

// array로 pass해도 되고 ,로 그냥 차례대로 pass해도 됨
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsLoggedIn = createSelector(
  [selectUser],
  (user) => user.isLoggedIn
);
