import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import classes from "./Modal.module.css";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const Modal = ({ children, ...props }) => {
  console.log("Modal", "props", props);
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={classes["fade-slide"]}
    >
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
