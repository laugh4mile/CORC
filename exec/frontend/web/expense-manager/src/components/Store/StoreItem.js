import { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './Item.module.css';

const StoreItem = (props) => {
  const history = useHistory();

  const isAccepted = (accepted) => {
    if (accepted === 0) return '삭제';
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
        <td className={`${classes.td} ${classes.checkbox}`}>
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
          className={`${classes.td} ${classes.link}`}
          onClick={trClickHandler}
        >
          {props.crNum}
        </td>
        <td className={`${classes.td}`}>{props.storeName}</td>
        <td className={`${classes.td}`}>{props.categoryCode}</td>
        <td className={`${classes.td}`}>
          {props.sido.sidoName} {props.gugun.gugunName}
        </td>
        <td
          className={`${classes.td} ${classes['text-sm']} ${classes['align-right']}`}
        >
          {formatMoney(props.total)}
        </td>
      </tr>
    </tbody>
  );
};

export default StoreItem;
