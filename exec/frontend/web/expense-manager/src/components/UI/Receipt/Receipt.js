import React from "react";

import classes from "./Receipt.module.css";

const Receipt = ({ ...props }) => {
  const formatMoney = (number) => new Intl.NumberFormat().format(number) + "원";
  return (
    <section className={classes.receipt}>
      <span className={classes.storeName}>{props.store.storeName}</span>
      <span className={classes.date}>{props.date.replace("T", " ")}</span>
      <ul className={classes.items}>
        {props.paymentitem.map((item) => (
          <li className={classes.item}>
            <span className={classes.product}>{item.productName}</span>
            <span className={classes.price}>{formatMoney(item.price)}</span>
            <span className={classes.amount}>{item.amount}</span>
            <span className={classes.sum}>
              {formatMoney(item.price * item.amount)}
            </span>
          </li>
        ))}
      </ul>
      <article className={classes.total}>
        <span className={classes.totalTitle}>결제 금액</span>
        <span className={classes.totalPrice}>{formatMoney(props.total)}</span>
      </article>
    </section>
  );
};

export default Receipt;
