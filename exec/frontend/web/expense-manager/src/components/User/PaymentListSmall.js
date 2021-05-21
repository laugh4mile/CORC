import { Fragment } from "react";

import Card from "../UI/Card/Card";

import classes from "./List.module.css";

const PaymentListSmall = (props) => {
  return (
    <Fragment>
      <Card type="nofit">
        <span>{props.title}</span>
        <table>
          <thead>
            <tr className={classes.tr}>
              <th style={{ width: "60%" }}>사원 이름</th>
              <th>부서</th>
              <th style={{ width: "60%" }}>날짜</th>
              <th style={{ width: "60%" }}>금액</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((payment) => (
              <PaymentItemSmall key={payment.userId} {...payment} />
            ))}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default PaymentListSmall;
