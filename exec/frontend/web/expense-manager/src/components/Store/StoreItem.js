import { useHistory } from "react-router-dom";

import classes from "./Item.module.css";

const StoreItem = (props) => {
  const history = useHistory();

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + "원";

  const trClickHandler = () =>
    history.push({
      pathname: `/store/sales/${props.storeId}`,
      state: {
        storeName: `${props.storeName}`,
        storeId: `${props.storeId}`,
        storeCrNum: `${props.crNum}`,
      },
    });

  return (
    <tbody>
      <tr
        className={`${classes.tr} ${
          props.verified ? null : classes["verify-fail"]
        }`}
      >
        <td style={{ width: "10%" }}>
          <input
            type="checkbox"
            value={props.storeId}
            name="storeId"
            onChange={(e) =>
              props.handleSingleCheck(e.target.checked, props.storeId)
            }
            // checkItems에 data.id가 있으면 체크 아니면 체크 해제
            checked={props.checkItems.includes(props.storeId) ? true : false}
          />
        </td>
        <td
          style={{ width: "60%" }}
          className={`${classes.td} ${classes["text-center"]}   ${classes.link}`}
          onClick={trClickHandler}
        >
          {props.crNum}
        </td>
        <td className={`${classes.td} ${classes["text-center"]} `}>
          {props.storeName}
        </td>
        <td style={{ width: "40%" }} className={classes.td}>
          {props.categoryCode}
        </td>
        <td style={{ width: "60%" }} className={classes.td}>
          {props.sido.sidoName} {props.gugun.gugunName}
        </td>
        <td
          style={{ width: "60%" }}
          className={`${classes.td} ${classes["text-right"]} ${classes["font-bold"]}`}
        >
          {formatMoney(props.total)}
        </td>
        {/* <td>{isAccepted(props.accepted)}</td> */}
      </tr>
    </tbody>
  );
};

export default StoreItem;
