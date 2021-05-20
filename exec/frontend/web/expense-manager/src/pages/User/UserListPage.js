import { useEffect, useState } from "react";

import UserList from "../../components/User/UserList";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { getUsers } from "../../lib/api-user";
import Page from "../../components/Pagenation/Page";

import classes from "./list.module.css";

const UserListPage = () => {
  const { sendRequest, status, data: loadedUsers, error } = useHttp(getUsers, true);

  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

  useEffect(() => {
    sendRequest(pageInfo);
  }, [sendRequest, pageInfo]);

  if (status === "pending") {
    return (
      <div className="page">
        <span className="title">사용자 목록</span>
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedUsers.content || loadedUsers.content.length === 0)) {
    return (
      <div className="page">
        <span className="title">사용자 목록</span>
        <span className={classes.inform}>등록된 사용자가 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="page">
      <span className="title">사용자 목록</span>
      <section className={classes.section}>
        <UserList users={loadedUsers.content} page={loadedUsers.numberOfElements} />
        <Page
          totalElements={loadedUsers.totalElements}
          blockSize={5}
          number={loadedUsers.number}
          size={loadedUsers.size}
          onClick={setPageInfo}
        ></Page>
      </section>
    </div>
  );
};

export default UserListPage;
