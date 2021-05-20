import React from "react";
import { Fragment, useState, useEffect } from "react";
import Card from "../Card/Card";
import Input from "../Input/Input";
import Button from "../Button/Button";
import classes from "./CardLimit.module.css";
import { modifyCardLimit } from "../../../lib/api-user";
import useHttp from "../../../hooks/use-http";

const CardLimit = ({ ...props }) => {
  const { sendRequest: sendCardLimit, status: cardLimitStatus } = useHttp(modifyCardLimit);
  const formatMoney = (number) => new Intl.NumberFormat().format(number) + "원";

  const [enteredLimit, setLimit] = useState();
  const [isEntering, setIsEntering] = useState(false);

  const changeHandler = (event) => {
    setIsEntering(true);
    const { value, name } = event.target;
    switch (name) {
      case "limit":
        setLimit(value);
        break;
      default:
        break;
    }
  };

  const cardLimitHandler = (limit, userIds) => {
    sendCardLimit({ limit, userIds });
  };

  const checkItems = [...props.checkItems];
  const submitCardLimitHandler = (event) => {
    cardLimitHandler(enteredLimit, checkItems);

    window.location.reload();
  };

  return (
    <section className={classes.receipt}>
      <article className={classes.total}>
        <div>
          <Input type="number" id="limit" name="limit" min="0" required onChange={changeHandler} label="한도 (원)" />
        </div>
      </article>
      <Button small allow fit name="allow" onClick={submitCardLimitHandler}>
        한도 수정
      </Button>
    </section>
  );
};

export default CardLimit;
