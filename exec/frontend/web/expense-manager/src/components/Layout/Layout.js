import { useContext, Fragment } from "react";
import AuthContext from "../../store/auth-context";

import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Fragment>
      {isLoggedIn && <MainNavigation />}
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
