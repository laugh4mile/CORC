import { useHistory } from 'react-router-dom';

import classes from './PaymentItem.module.css';

const PaymentItem = (props) => {
  const history = useHistory();

  const isAccepted = (accepted) => {
    if (accepted === 0) return '거절';
    else if (accepted === 1) return '대기';
    else return '승인';
  };

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + '원';

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
        <td>
          <input type="checkbox" />
        </td>
        <td className={classes.link} onClick={trClickHandler}>
          {props.store.storeName}
        </td>
        <td>{props.user.userName}</td>
        <td>{props.date.slice(0, 10)}</td>
        <td>{formatMoney(props.total)}</td>
        <td>{isAccepted(props.status)}</td>
      </tr>
    </tbody>
  );
};

export default PaymentItem;
