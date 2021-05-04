import React from "react";

import "./base-button.styles.scss";

const BaseButton = ({ children, inverted, ...otherProps }) => (
  <button
    className={`${inverted ? "inverted" : ""} base-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default BaseButton;
