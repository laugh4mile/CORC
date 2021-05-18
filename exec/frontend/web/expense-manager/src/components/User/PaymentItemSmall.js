import { Fragment } from "react";

import classes from "./Item.module.css";

const PaymentItem = (props) => {
  const formatMoney = (number) => new Intl.NumberFormat().format(number) + "원";
  const totalPrice = () =>
    props.paymentitem.reduce(
      (accumulatedQuantity, item) =>
        accumulatedQuantity + item.price * item.amount,
      0
    );

  return (
    <Fragment>
      <tr
        className={`${classes.tr} ${
          props.verified ? null : classes["verify-fail"]
        }`}
      >
        <td style={{ width: "60%" }} className={`${classes.td}`}>
          {props.store.userName}
        </td>
        <td className={`${classes.td}`}>{props.departmentName}</td>
        <td
          style={{ width: "60%" }}
          className={`${classes.td} ${classes["text-sm"]} ${classes.date}`}
        >
          {props.date.slice(0, 10)}
        </td>
        <td
          style={{ width: "60%" }}
          className={`${classes.td} ${classes["font-bold"]} ${classes["align-right"]}`}
        >
          {formatMoney(totalPrice())}
        </td>
      </tr>
    </Fragment>
  );
};

export default PaymentItem;
