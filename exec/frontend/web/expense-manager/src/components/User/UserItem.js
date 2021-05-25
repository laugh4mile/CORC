import { Fragment } from "react";
import { useHistory } from "react-router-dom";

import classes from "./Item.module.css";

const UserItem = (props) => {
  const history = useHistory();

  const isActive = (status) => {
    if (status === 0) return "삭제됨";
    else if (status === 1) return "활성";
    else return "정지";
  };

  const activeStyle = (status) => {
    if (status === 0) return classes.deleted;
    else if (status === 1) return classes.active;
    else return classes.inactive;
  };

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + "원";

  const trClickHandler = () =>
    history.push({
      pathname: `/user/list/${props.employeeNum}`,
      state: { userName: `${props.userName}`, userId: `${props.userId}` },
    });

  return (
    <Fragment>
      <tr
        className={`${classes.tr} ${
          props.verified ? null : classes["verify-fail"]
        }`}
      >
        <td
          style={{ width: "30%", fontSize: "0.875rem" }}
          className={`${classes.td} ${
            props.verified ? classes.online : classes.offline
          }`}
        >
          ●
        </td>
        <td className={`${classes.td} ${classes.checkbox}`}>
          <input
            type="checkbox"
            value={props.userId}
            name="userId"
            onChange={(e) =>
              props.handleSingleCheck(
                e.target.checked,
                props.userId,
                props.index
              )
            }
            // checkItems에 data.id가 있으면 체크 아니면 체크 해제
            checked={props.checkItems.includes(props.userId) ? true : false}
          />
        </td>
        <td
          className={`${classes.td} ${classes.link}`}
          onClick={trClickHandler}
        >
          {props.employeeNum}
        </td>
        <td className={`${classes.td}`}>{props.userName}</td>
        <td className={`${classes.td}`}>{props.department}</td>
        <td className={`${classes.td}`}>{props.position}</td>
        <td
          className={`${classes.td} ${classes["text-sm"]} ${classes["align-right"]}`}
        >
          {formatMoney(props.balance)}
        </td>
        <td
          className={`${classes.td} ${classes["text-sm"]} ${classes["align-right"]}`}
        >
          {formatMoney(props.cardLimit)}
        </td>
        <td className={`${classes.td} ${activeStyle(props.active)}`}>
          {isActive(props.active)}
        </td>
        <td className={`${classes.td} ${classes["text-sm"]} ${classes.date}`}>
          {props.accessTime.slice(0, 10)}
        </td>
      </tr>
    </Fragment>
  );
};

export default UserItem;
