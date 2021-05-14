import { useHistory } from "react-router-dom";

import classes from "./PaymentItem.module.css";

const PaymentItem = (props) => {
  console.log("PIPIPIPIPI", props);
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
    <tbody>
      <tr className={classes.tr}>
        <td style={{ width: "10%" }} className={classes.td}>
          <input type="checkbox" />
        </td>
        <td
          className={`${classes.td} ${classes.link} ${classes["text-left"]}`}
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
    </tbody>
  );
};

export default PaymentItem;
