import { Fragment } from 'react';

import PaymentItem from './PaymentItem';
import Card from '../UI/Card/Card';

import classes from './List.module.css';

const PaymentList = (props) => {
  return (
    <Fragment>
      <Card type="nofit">
        <table>
          <thead>
            <tr className={classes.tr}>
              <th>거래번호</th>
              <th>업종</th>
              <th>상호명</th>
              <th>지역</th>
              <th>상세 내용</th>
              <th>날짜</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {props.payments.map((payment) => (
              <PaymentItem key={payment.userId} {...payment} />
            ))}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default PaymentList;
