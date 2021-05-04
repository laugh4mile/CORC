import React from "react";

import "./base-input.styles.scss";

const BaseInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input className="base-input" onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`base-input-label ${
          otherProps.value.length ? "shrink" : ""
        }`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default BaseInput;
