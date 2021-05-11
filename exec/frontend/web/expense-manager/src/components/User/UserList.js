import { Fragment } from "react";
// import { useHistory, useLocation } from "react-router-dom";

import Card from "../../components/UI/Card/Card";
import UserItem from "./UserItem";
import classes from "./UserList.module.css";

const sortUsers = (users, ascending) => {
  return users.sort((userA, userB) => {
    if (ascending) {
      return userA.id - userB.id;
    } else {
      return userB.id - userA.id;
    }
  });
};

const UserList = (props) => {
  return (
    <Fragment>
      <Card type="nofit">
        <table>
          <thead>
            <tr className={classes.tr}>
              <th className={classes.checkbox}>
                <input type="checkbox" name="status" />
              </th>
              <th>아이디</th>
              <th>이름</th>
              <th>부서</th>
              <th>직급</th>
              <th>잔액</th>
              <th>한도</th>
              <th>상태</th>
              <th>마지막 접속일</th>
            </tr>
          </thead>
          {props.users.map((user) => (
            <UserItem key={user.userId} {...user} />
          ))}
        </table>
      </Card>
    </Fragment>
  );
};

export default UserList;
