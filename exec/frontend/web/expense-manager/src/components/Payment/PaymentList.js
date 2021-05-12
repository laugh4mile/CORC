import { Fragment } from 'react';
// import { useHistory, useLocation } from "react-router-dom";

import Card from '../../components/UI/Card/Card';
import PaymentItem from './PaymentItem';
import classes from './PaymentList.module.css';

const sortPayments = (payments, ascending) => {
  return payments.sort((paymentA, paymentB) => {
    if (ascending) {
      return paymentA.id - paymentB.id;
    } else {
      return paymentB.id - paymentA.id;
    }
  });
};

const PaymentList = (props) => {
  return (
    <Fragment>
      <Card type="nofit">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="status" />
              </th>
              <th>가맹점명</th>
              <th>사용자명</th>
              <th>결제 날짜</th>
              <th>결제 금액</th>
              <th>승인 여부</th>
            </tr>
          </thead>
          {props.payments.map((payment) => (
            <PaymentItem key={payment.paymentId} {...payment} />
          ))}
        </table>
      </Card>
    </Fragment>
  );
};

export default PaymentList;