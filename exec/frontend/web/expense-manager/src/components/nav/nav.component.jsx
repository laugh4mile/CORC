import React from "react";

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

import {
  NavContainer,
  OptionsContainer,
  OptionsTitle,
  OptionLink,
  OptionDivider,
} from "./nav.styles";

const Nav = () => (
  <NavContainer>
    <OptionsContainer>
      <OptionLink to="/dashboard">
        <DashboardIcon />
        <span>대쉬보드</span>
      </OptionLink>
    </OptionsContainer>
    <OptionsContainer>
      <OptionsTitle>사용자</OptionsTitle>
      <OptionLink to="/user/register">
        <UserRegisterIcon className="icon" />
        <span>사용자 등록</span>
      </OptionLink>
      <OptionLink to="/user/list">
        <UserListIcon className="icon" />
        <span>사용자 목록</span>
      </OptionLink>
      <OptionLink to="/user/paymentdetails">
        <UserPaymentDetailsIcon className="icon" />
        <span>결제내역</span>
      </OptionLink>
    </OptionsContainer>
    <OptionsContainer>
      <OptionsTitle>가맹점</OptionsTitle>
      <OptionLink to="/store/list">
        <StoreListIcon className="icon" />
        <span>가맹점 목록</span>
      </OptionLink>
      <OptionLink to="/store/requested">
        <StoreRequestedIcon className="icon" />
        <span>가맹점 신청 목록</span>
      </OptionLink>
      <OptionLink to="/store/salesdetails">
        <StoreSalesDetailsIcon className="icon" />
        <span>판매 내역</span>
      </OptionLink>
    </OptionsContainer>
    <OptionsContainer>
      <OptionsTitle>통계</OptionsTitle>
      <OptionLink to="/statistics">
        <StatisticsIcon className="icon" />
        <span>통계</span>
      </OptionLink>
    </OptionsContainer>
    <OptionDivider></OptionDivider>
    <OptionsContainer>
      <OptionLink to="/settings">
        <SettingsIcon className="icon" />
        <span>설정</span>
      </OptionLink>
      <OptionLink to="/signin">
        <SignOutIcon className="icon" />
        <span>로그아웃</span>
      </OptionLink>
    </OptionsContainer>
  </NavContainer>
);

export default Nav;
