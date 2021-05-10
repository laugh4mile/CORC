import React from 'react';
import { useSelector } from 'react-redux';

import LoginNavigation from './LoginNavigation'
import TabNavigation from './TabNavigation'
import StartupScreen from '../screens/StartupScreen';

const Navigation = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  return (
    <>
      {isAuth && <TabNavigation />}
      {!isAuth && didTryAutoLogin && <LoginNavigation />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </>
  );
}

export default Navigation