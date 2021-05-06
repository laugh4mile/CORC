import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import { signInSuccess, signInFailure } from "./user.actions";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(signInSuccess(collectionsMap));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([call(onSignInStart), call(onSignUpStart), call(onSignUpSuccess)]);
}
