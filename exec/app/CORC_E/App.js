import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './store/reducers/auth';
import Navigation from './navigations/Navigation';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default class extends React.Component {
  constructor() {
    super();
    console.log(this.getToken());
  }
  // async getToken(user) {
  //   try {
  //     let userData = await AsyncStorage.getItem('userData');
  //     let data = JSON.parse(userData);
  //     console.log('good : ', data);
  //   } catch (error) {
  //     console.log('Something went wrong', error);
  //   }
  // }
  getToken = async () => {
    const userToken = await AsyncStorage.getItem('userData');
  };
  state = {};
  compo;
  componentDidMount() {
    // this.getToken();
  }
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
