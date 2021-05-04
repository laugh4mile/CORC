import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './store/reducers/auth';
import Navigation from './navigations/Navigation';
import Loading from './screens/Loading';
import BottomTabNavigation from './navigations/BottomTabNavigation';

const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default class extends React.Component {
  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      console.log('good : ', data);
      this.setState({
        isLoading: false,
        data: data,
      });
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  state = {
    isLoading: true,
  };
  compo;
  componentDidMount() {
    this.getToken();
  }
  render() {
    const { isLoading, data } = this.state;
    console.log('isLoading : ', isLoading);
    console.log('data : ', data);
    return isLoading ? (
      <Loading />
    ) : !data ? (
      <Provider store={store}>
        <View style={styles.container}>
          <Navigation />
          <StatusBar style="auto" />
        </View>
      </Provider>
    ) : (
      <BottomTabNavigation />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
