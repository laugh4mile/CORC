import { Fragment } from "react";

import UserLogItem from "./UserLogItem";
import classes from "./UserList.module.css";

const UserInfo = (props) => {
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
        {/* {props.logs.map((log) => (
            <UserLogItem key={log.userId} {...log} />
          ))} */}
      </table>
    </Fragment>
  );
};

export default UserInfo;
