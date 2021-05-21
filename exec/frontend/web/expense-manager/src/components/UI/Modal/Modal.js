import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import classes from "./Modal.module.css";
import "./Modal.css";

const animationTiming = {
  enter: 400,
  exit: 400,
};

const Modal = ({ children, ...props }) => {
  return (
    <CSSTransition mountOnEnter unmountOnExit in={props.show} timeout={300} classNames="alert">
      <div className={classes.Modal}>
        <span onClick={props.closed} className={classes.closeBtn}>
          ✕
        </span>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Modal;
