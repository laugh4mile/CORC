import { Fragment } from 'react';
// import { useHistory, useLocation } from "react-router-dom";

import Card from '../../components/UI/Card/Card';
import PaymentItem from './PaymentItem';
import classes from './List.module.css';

const PaymentList = (props) => {
  return (
    <Fragment>
      <Card type="nofit">
        <table>
          <thead>
            <tr className={classes.tr}>
              <th>거래번호</th>
              <th>상호명</th>
              <th>사용자명</th>
              <th>상세 정보</th>
              <th>결제 날짜</th>
              <th>결제 금액</th>
              <th>승인 여부</th>
            </tr>
          </thead>
          <tbody>
            {props.payments.map((payment) => (
              <PaymentItem key={payment.paymentId} {...payment} />
            ))}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default PaymentList;
