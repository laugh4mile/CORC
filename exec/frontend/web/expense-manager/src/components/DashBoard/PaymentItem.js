import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import Receipt from "../UI/Receipt/Receipt";
import { ReactComponent as ReceiptIcon } from "../../assets/receipt.svg";

import classes from "./Item.module.css";

const PaymentItem = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const paymentContents = (items) => {
    let resultStr = `${items[0].productName} ✕ ${items[0].amount}`;
    if (items.length === 1) return resultStr;

    return resultStr + ` 외 ${items.length - 1}건`;
  };

  const history = useHistory();

  const isAccepted = (accepted) => {
    if (accepted === 0) return "거절";
    else if (accepted === 1) return "대기";
    else return "승인";
  };

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + "원";

  const activeStyle = (status) => {
    if (status === 0) return classes.deleted;
    else if (status === 1) return classes.inactive;
    else return classes.active;
  };

  const trClickHandler = () =>
    history.push({
      pathname: `/store/sales/${props.store.storeId}`,
      state: {
        storeName: `${props.store.storeName}`,
        storeId: `${props.store.storeId}`,
        storeCrNum: `${props.store.crNum}`,
      },
    });

  return (
    <Fragment>
      <tr className={classes.tr}>
        <td className={`${classes.td} ${classes["text-sm"]} ${classes["font-normal"]}`}>{props.store.storeName}</td>
        <td className={`${classes.td}`}>{props.user.userName}</td>
        <td className={`${classes.td}`}>{props.user.department}</td>
        <td className={`${classes.td} ${classes["text-sm"]} ${classes.date}`}>{props.date.slice(0, 10)}</td>
        <td className={`${classes.td} ${classes["text-sm"]} ${classes["align-right"]}`}>{formatMoney(props.total)}</td>
      </tr>
    </Fragment>
  );
};

export default PaymentItem;
