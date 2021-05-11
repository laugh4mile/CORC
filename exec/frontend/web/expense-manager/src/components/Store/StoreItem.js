import { useHistory } from 'react-router-dom';

import classes from './StoreItem.module.css';

const StoreItem = (props) => {
  const history = useHistory();

  const isAccepted = (accepted) => {
    if (accepted === 0) return '삭제됨';
    else if (accepted === 1) return '대기';
    else return '활성';
  };

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + '원';

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
      <tr className={classes.tr}>
        <td>
          <input type="checkbox" />
        </td>
        <td className={classes.link} onClick={trClickHandler}>
          {props.crNum}
        </td>
        <td>{props.storeName}</td>
        <td>{props.categoryCode}</td>
        <td>
          {props.sido.sidoName} {props.gugun.gugunName}
        </td>
        <td>{props.total}</td>
        {/* <td>{isAccepted(props.accepted)}</td> */}
      </tr>
    </tbody>
  );
};

export default StoreItem;
