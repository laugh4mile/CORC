import { Fragment } from 'react';

import StoreSalesItem from '../Payment/PaymentItem';
import classes from './List.module.css';

const StoreSales = (props) => {
  if (props.logs.length === 0) {
    return (
      <Fragment>
        <span>해당 가맹점의 판매 내역이 없습니다</span>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <table>
        <thead>
          <tr className={classes.tr}>
            <th>거래번호</th>
            <th>상호명</th>
            <th>사용자명</th>
            <th>상세 내용</th>
            <th>결제 날짜</th>
            <th>결제 금액</th>
            <th>승인 여부</th>
          </tr>
        </thead>
        <tbody>
          {props.logs.map((payment) => (
            <StoreSalesItem key={payment.paymentId} {...payment} />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default StoreSales;
