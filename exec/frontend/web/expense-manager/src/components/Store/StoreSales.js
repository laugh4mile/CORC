import { Fragment } from "react";

import StoreSalesItem from "../Payment/PaymentItem";
import classes from "./List.module.css";

const StoreSales = (props) => {
  console.log("props", props);
  return (
    <Fragment>
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
        {props.logs.map((payment) => (
          <StoreSalesItem key={payment.paymentId} {...payment} />
        ))}
      </table>
    </Fragment>
  );
};

export default StoreSales;
