import React from 'react';
import { useSelector } from 'react-redux';

import LoginNavigation from './LoginNavigation'
import TabNavigation from './TabNavigation'

const Navigation = props => {
  const isAuth = useSelector(state => !!state.auth.token);

  return (
    <>
      {!isAuth && <LoginNavigation />}
      {isAuth && <TabNavigation />}
    </>
  );
}

export default Navigation