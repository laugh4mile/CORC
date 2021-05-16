import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className={classes.container}>
      {isLoggedIn && <MainNavigation />}
      <main className={isLoggedIn ? classes.main : ""}>{props.children}</main>
    </div>
  );
};

export default Layout;
