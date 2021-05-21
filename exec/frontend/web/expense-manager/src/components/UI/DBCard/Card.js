import React from "react";

import classes from "./Card.module.css";

const Card = ({ children, type }) => {
  const nofitClass = type === "nofit" ? classes.nofit : "";

  return <div className={`${classes.card} ${nofitClass}`}>{children}</div>;
};

export default Card;
