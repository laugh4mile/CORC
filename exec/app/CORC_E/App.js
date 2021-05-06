import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StatusBar } from 'expo-status-bar';

import authReducer from './store/reducers/auth';
import Navigation from './navigations/Navigation';

const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Navigation />
          <StatusBar style="auto" />
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
