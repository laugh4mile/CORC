import { Fragment, useState } from "react";

import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import Receipt from "../UI/Receipt/Receipt";
import { ReactComponent as ReceiptIcon } from "../../assets/receipt.svg";
import classes from "./Item.module.css";

const PaymentItem = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + "원";

  const showModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const totalPrice = () =>
    props.paymentitem.reduce(
      (accumulatedQuantity, item) =>
        accumulatedQuantity + item.price * item.amount,
      0
    );

  const paymentContents = (items) => {
    let resultStr = `${items[0].productName} ✕ ${items[0].amount}`;
    if (items.length === 1) return resultStr;

    return resultStr + ` 외 ${items.length - 1}건`;
  };

  return (
    <Fragment>
      <Modal show={modalIsOpen} closed={closeModal}>
        <Receipt {...props} />
      </Modal>
      {modalIsOpen ? <Backdrop show={modalIsOpen} closed={closeModal} /> : null}
      <tr
        className={`${classes.tr} ${
          props.verified ? null : classes["verify-fail"]
        }`}
      >
        <td
          style={{ width: "30%" }}
          className={`${classes.td} ${
            props.verified ? classes.online : classes.offline
          }`}
        >
          ●
        </td>
        <td style={{ width: "40%" }} className={`${classes.td}`}>
          {props.paymentId}
        </td>
        <td
          className={`${classes.td} ${classes["text-sm"]} ${classes["font-normal"]}`}
        >
          {props.store.category.categoryName}
        </td>
        <td className={`${classes.td}`}>{props.store.storeName}</td>
        <td
          className={`${classes.td}`}
        >{`${props.store.sido.sidoName} ${props.store.gugun.gugunName}`}</td>
        <td className={`${classes.td} ${classes["td-flex"]}`}>
          <span className={`${classes["text-right"]} ${classes["text-sm"]}`}>
            {paymentContents(props.paymentitem)}
          </span>
          <ReceiptIcon className={classes.icon} onClick={showModal} />
        </td>
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
          {formatMoney(props.total)}
        </td>
      </tr>
    </Fragment>
  );
};

export default PaymentItem;
