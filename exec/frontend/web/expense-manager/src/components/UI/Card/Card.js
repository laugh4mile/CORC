import React from "react";

import classes from "./Card.module.css";

const BaseCard = ({ children }) => (
  <div className={classes.card}>{children}</div>
);

export default BaseCard;
