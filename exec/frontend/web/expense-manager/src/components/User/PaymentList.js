import React, { Fragment } from "react";

import PaymentItem from "./PaymentItem";
import Card from "../UI/Card/Card";

import classes from "./List.module.css";

const PaymentList = (props) => {
  return (
    <Fragment>
      <Card type="nofit">
        <table>
          <thead>
            <tr className={classes.tr}>
              <th style={{ width: "30%", fontSize: "0.875rem" }}>상태</th>
              <th style={{ width: "40%" }}>거래번호</th>
              <th>업종</th>
              <th>상호명</th>
              <th>지역</th>
              <th>상세 내용</th>
              <th style={{ width: "60%" }}>날짜</th>
              <th style={{ width: "60%" }}>금액</th>
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
