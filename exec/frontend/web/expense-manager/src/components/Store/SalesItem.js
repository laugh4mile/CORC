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

  const isAccepted = (status) => {
    if (status === 0) return "거절";
    else if (status === 1) return "대기";
    else return "승인";
  };

  const acceptedStyle = (status) => {
    if (status === 0) return classes.deleted;
    else if (status === 1) return classes.inactive;
    else return classes.active;
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
      <Modal show={modalIsOpen} closed={closeModal}>
        <span>결제 상세 내역</span>
        <Receipt {...props} />
      </Modal>
      {modalIsOpen ? <Backdrop show={modalIsOpen} closed={closeModal} /> : null}
      <tr
        className={`${classes.tr}  ${
          props.verified ? null : classes["verify-fail"]
        }`}
      >
        <td
          style={{ width: "10%" }}
          className={`${classes.td} ${
            props.verified ? classes.online : classes.offline
          }`}
        >
          ●
        </td>
        <td
          className={`${classes.td} ${classes["text-center"]} ${classes.link}`}
          onClick={trClickHandler}
        >
          {props.store.storeName}
        </td>
        <td style={{ width: "40%" }} className={classes.td}>
          {props.user.userName}
        </td>
        <td
          style={{ width: "50%" }}
          className={`${classes.td} ${classes["text-right"]} ${classes["font-bold"]}`}
        >
          {formatMoney(props.total)}
        </td>
        <td
          style={{ width: "40%" }}
          className={`${classes.td} ${classes.date} ${classes["text-sm"]}`}
        >
          {props.date.slice(0, 10)}
        </td>
        <td
          style={{ width: "20%" }}
          className={`${classes.td} ${acceptedStyle(props.status)} ${
            classes["font-bold"]
          }`}
        >
          {isAccepted(props.status)}
        </td>
      </tr>
    </Fragment>
  );
};

export default PaymentItem;
