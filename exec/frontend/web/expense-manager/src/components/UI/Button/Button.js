import React from "react";

import classes from "./Button.module.css";

const Button = ({ children, sub, small, fit, allow, deny, ...props }) => (
  <button
    {...props}
    className={`${small ? classes["button-small"] : classes.button} ${
      sub ? classes.sub : " "
    } ${fit ? classes["margin-fit"] : ""} ${allow ? classes.allow : " "} ${
      deny ? classes.deny : " "
    }`}
  >
    {children}
  </button>
);

export default Button;
