import { Fragment } from "react";

import StoreSalesItem from "./SalesItem";
import classes from "./List.module.css";

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
            <th style={{ width: "10%" }}>상태</th>
            <th>가맹점명</th>
            <th style={{ width: "40%" }}>사용자명</th>
            <th style={{ width: "50%" }}>결제 금액</th>
            <th style={{ width: "40%" }}>결제 날짜</th>
            <th style={{ width: "20%" }}>승인 여부</th>
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
