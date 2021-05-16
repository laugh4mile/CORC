import React from "react";

import classes from "./Card.module.css";

const Card = ({ children, type, marginSM }) => (
  <div
    className={`${classes.card} ${type === "nofit" ? classes.nofit : ""} ${
      marginSM ? classes.marginSM : ""
    }`}
  >
    {children}
  </div>
);

export default Card;
