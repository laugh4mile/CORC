import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

import { ReactComponent as DashboardIcon } from "../../assets/dashboard.svg";
import { ReactComponent as UserRegisterIcon } from "../../assets/userRegister.svg";
import { ReactComponent as UserListIcon } from "../../assets/userList.svg";
import { ReactComponent as UserPaymentDetailsIcon } from "../../assets/userPaymentDetails.svg";
import { ReactComponent as StoreListIcon } from "../../assets/storeList.svg";
import { ReactComponent as StoreRequestedIcon } from "../../assets/storeRequested.svg";
import { ReactComponent as StoreSalesDetailsIcon } from "../../assets/storeSalesDetails.svg";
import { ReactComponent as StatisticsIcon } from "../../assets/statistics.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as SignOutIcon } from "../../assets/signOut.svg";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <header className={classes.header}>
      <span className={classes["header-title"]}>코르크</span>
      <nav className={classes.nav}>
        <NavLink to="/dashboard" activeClassName={classes.active}>
          <DashboardIcon className={classes.icon} />
          <span>대쉬보드</span>
        </NavLink>
      </nav>
      <nav className={classes.nav}>
        <span className={classes.title}>사용자</span>
        <NavLink to="/user/register" activeClassName={classes.active}>
          <UserRegisterIcon className={classes.icon} />
          <span>사용자 등록</span>
        </NavLink>
        <NavLink to="/user/list" activeClassName={classes.active}>
          <UserListIcon className={classes.icon} />
          <span>사용자 목록</span>
        </NavLink>
        <NavLink to="/user/payment" activeClassName={classes.active}>
          <UserPaymentDetailsIcon className={classes.icon} />
          <span>결제내역</span>
        </NavLink>
      </nav>
      <nav className={classes.nav}>
        <span className={classes.title}>가맹점</span>
        <NavLink to="/store/list" activeClassName={classes.active}>
          <StoreListIcon className={classes.icon} />
          <span>가맹점 목록</span>
        </NavLink>
        <NavLink to="/store/requested" activeClassName={classes.active}>
          <StoreRequestedIcon className={classes.icon} />
          <span>가맹점 신청 목록</span>
        </NavLink>
        <NavLink to="/store/sales" activeClassName={classes.active}>
          <StoreSalesDetailsIcon className={classes.icon} />
          <span>판매 내역</span>
        </NavLink>
      </nav>
      {/* <nav className={classes.nav}>
        <span className={classes.title}>통계</span>
        <NavLink to="/statistics" activeClassName={classes.active}>
          <StatisticsIcon className={classes.icon} />
          <span>통계</span>
        </NavLink>
      </nav> */}
      <div className={classes.divider}></div>
      <nav className={classes.nav}>
        {/* <NavLink to="/settings" activeClassName={classes.active}>
          <SettingsIcon className={classes.icon} />
          <span>설정</span>
        </NavLink> */}
        <div className={classes["nav-item"]} onClick={logoutHandler}>
          <SignOutIcon className={classes.icon} />
          <span>로그아웃</span>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
