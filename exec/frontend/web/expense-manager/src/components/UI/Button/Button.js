import React from "react";

import classes from "./Button.module.css";

const Button = ({ children, ...otherProps }) => (
  <button className={classes.button} {...otherProps}>
    {children}
  </button>
);

export default Button;
