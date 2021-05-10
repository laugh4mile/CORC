import { useHistory } from "react-router-dom";

import classes from "./UserItem.module.css";

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
      state: { userName: `${props.userName}` },
    });

  return (
    <tbody>
      <tr className={classes.tr}>
        <td className={`${classes.td} ${classes.checkbox}`}>
          <input type="checkbox" />
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
    </tbody>
  );
};

export default UserItem;
