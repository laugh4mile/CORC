import React from "react";

import classes from "./Card.module.css";

const Card = ({ children, type, unset }) => (
  <div
    className={`${classes.card} ${type === "nofit" ? classes.nofit : ""} ${
      unset ? classes.unset : ""
    }`}
  >
    {children}
  </div>
);

export default Card;
