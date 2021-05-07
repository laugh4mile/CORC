import React from "react";

import classes from "./Button.module.css";

const Button = ({ children, sub }) => (
  <button className={`${classes.button} ${sub ? classes.sub : " "}`}>
    {children}
  </button>
);

export default Button;
