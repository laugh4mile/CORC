import React from "react";

import { Link } from "react-router-dom";

import {ReactComponent as DashboardIcon } from "../../assets/dashboard.svg"

const Nav = () => (
    <div className="nav">
        <Link to="/dashboard" className="nav-item">
            <DashboardIcon className="icon" />
        </Link>
        <Link to="/user/register">

        </Link>

    </div>
);

export default Nav;