import { useHistory } from "react-router-dom";

import classes from "./UserItem.module.css";

const UserItem = (props) => {
  const history = useHistory();

  const isActive = (status) => {
    if (status === 0) return "삭제됨";
    else if (status === 1) return "활성";
    else return "정지";
  };

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + "원";

  const trClickHandler = () =>
    history.push({
      pathname: `/user/payment/${props.employeeNum}`,
      state: { userName: `${props.userName}` },
    });

  return (
    <tbody>
      <tr className={classes.tr}>
        <td>
          <input type="checkbox" />
        </td>
        <td className={classes.link} onClick={trClickHandler}>
          {props.employeeNum}
        </td>
        <td>{props.userName}</td>
        <td>{props.department}</td>
        <td>{props.position}</td>
        <td>{formatMoney(props.balance)}</td>
        <td>{formatMoney(props.cardLimit)}</td>
        <td>{isActive(props.active)}</td>
        <td>{props.accessTime.slice(0, 10)}</td>
      </tr>
    </tbody>
  );
};

export default UserItem;
