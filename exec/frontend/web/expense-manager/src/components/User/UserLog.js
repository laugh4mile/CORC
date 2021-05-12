import { Fragment } from "react";

import PaymentItem from "./PaymentItem";
import classes from "./List.module.css";

const UserLog = (props) => {
  return (
    <Fragment>
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
          {props.logs.map((log) => (
            <PaymentItem key={log.userId} {...log} />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default UserLog;
