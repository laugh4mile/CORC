import { Fragment } from "react";

import Card from "../../components/UI/Card/Card";
import PaymentItem from "./PaymentItem";
import classes from "./List.module.css";

const PaymentList = (props) => {
  return (
    <Fragment>
      <Card small>
        <span className={classes.title}>실시간 결제 현황</span>
        <table>
          <thead>
            <tr className={classes.tr}>
              <th>상호명</th>
              <th>사용자명</th>
              <th>부서</th>
              <th>결제 날짜</th>
              <th>결제 금액</th>
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
