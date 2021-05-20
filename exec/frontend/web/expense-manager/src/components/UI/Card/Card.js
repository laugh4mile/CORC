import React from "react";

import classes from "./Card.module.css";

const Card = ({ children, type, unset, small, full, ...props }) => (
  <div
    className={`${full ? classes["card-full"] : classes.card} ${
      type === "nofit" ? classes.nofit : ""
    } ${unset ? classes.unset : ""} ${small ? classes.small : ""}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
