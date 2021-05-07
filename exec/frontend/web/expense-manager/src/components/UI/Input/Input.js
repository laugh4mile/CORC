import React from "react";

import classes from "./Input.module.css";

const Input = ({ handleChange, label, ...props }) => {
  return (
    <section className={classes.control}>
      <input className={classes.input} onChange={handleChange} {...props} />
      {label ? (
        <label className={`${classes.label} ${classes.shrink}`}>{label}</label>
      ) : null}
    </section>
  );
};

export default Input;
