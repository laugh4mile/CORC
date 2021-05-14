import { Fragment } from "react";
// import { useHistory, useLocation } from "react-router-dom";

import Card from "../../components/UI/Card/Card";
import PaymentItem from "./PaymentItem";
import classes from "./List.module.css";

const PaymentList = (props) => {
  return (
    <Fragment>
      <Card type="nofit">
        <table>
          <thead>
            <tr className={classes.tr}>
              <th style={{ width: "10%" }}>
                <input type="checkbox" name="status" />
              </th>
              <th>가맹점명</th>
              <th style={{ width: "40%" }}>사용자명</th>
              <th style={{ width: "50%" }}>결제 금액</th>
              <th style={{ width: "40%" }}>결제 날짜</th>
              <th style={{ width: "20%" }}>승인 여부</th>
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
