import React from "react";

import { Link } from "react-router-dom";

import { ReactComponent as DashboardIcon } from "../../assets/dashboard.svg";

const Nav = () => (
  <div className="nav">
    <Link to="/" className="nav-item">
      <DashboardIcon className="icon" />
      <span>대쉬보드</span>
    </Link>
    <Link to="/user/register"></Link>
  </div>
);

export default Nav;
