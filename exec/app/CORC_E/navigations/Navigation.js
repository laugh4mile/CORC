import React from 'react';
import { useSelector } from 'react-redux';

import LoginNavigation from './LoginNavigation';
import BottomTabNavigation from './BottomTabNavigation';

const Navigation = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <>
      {!isAuth && <LoginNavigation />}
      {isAuth && <BottomTabNavigation />}
    </>
  );
};

export default Navigation;
