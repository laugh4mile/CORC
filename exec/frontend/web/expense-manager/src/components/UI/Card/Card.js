import React from "react";

import classes from "./Card.module.css";

const Card = ({ children, type, unset, small }) => (
  <div
    className={`${classes.card} ${type === "nofit" ? classes.nofit : ""} ${
      unset ? classes.unset : ""
    } ${small ? classes.small : ""}`}
  >
    {children}
  </div>
);

export default Card;
