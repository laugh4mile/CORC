import React, { Fragment } from 'react';

import classes from './Receipt.module.css';

const Receipt = ({ ...props }) => {
  const formatMoney = (number) => new Intl.NumberFormat().format(number) + '원';
  return (
    <Fragment>
      <span className={classes.storeName}>{props.store.storeName}</span>
      <span className={classes.date}>{props.date.replace('T', ' ')}</span>
      <ul>
        {props.paymentitem.map((item) => (
          <li className={classes.item}>
            <span>{item.productName}</span>
            <span>{formatMoney(item.price)}</span>
          </li>
        ))}
      </ul>
      <span className={classes.totalPrice}>{formatMoney(props.total)}</span>
    </Fragment>
  );
};

export default Receipt;
