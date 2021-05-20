import { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import {
  getSingleUser,
  getUserPaymentDetails,
  modifyUser,
} from "../../lib/api-user";

import UserInfo from "../../components/User/UserInfo";
import PaymentList from "../../components/User/PaymentList";

import Page from "../../components/Pagenation/Page";
import classes from "./UserDetailPage.module.css";

const UserDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const { userName } = location.state;
  const [infoStyle, setInfoStyle] = useState(true);
  const [logStyle, setLogStyle] = useState(false);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

  const infoClickHandler = () => {
    setInfoStyle(true);
    setLogStyle(false);
  };

  const logClickHandler = () => {
    setInfoStyle(false);
    setLogStyle(true);
  };

  const goBackHandler = () => history.goBack();

  const infoActiveStyle = () => (infoStyle ? classes.active : "");
  const logActiveStyle = () => (logStyle ? classes.active : "");

  const { userId } = location.state;

  const {
    sendRequest: sendUserInfoRequest,
    status: userInfoStatus,
    data: loadedUser,
    error: userInfoError,
  } = useHttp(getSingleUser, true);

  const {
    sendRequest: sendUserLogRequest,
    status: userLogStatus,
    data: loadedLogs,
    error: userLogError,
  } = useHttp(getUserPaymentDetails, true);

  const { sendRequest: sendModifyStore, status: modifyStatus } =
    useHttp(modifyUser);

  useEffect(() => {
    sendUserInfoRequest(userId);
    sendUserLogRequest({ userId, pageInfo });
  }, [sendUserInfoRequest, sendUserLogRequest, userId, pageInfo]);

  useEffect(() => {
    if (modifyStatus === "completed") {
      history.goBack();
    }
  }, [modifyStatus, history]);

  if (userInfoStatus === "pending" || userLogStatus === "pending") {
    return (
      <div className="page">
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (userInfoError) {
    return (
      <div className="page">
        <span className="title">{`${userName} (${params.employeeNum})`}</span>
        <span className="btn" onClick={goBackHandler}>
          목록으로
        </span>
        <span className={classes.inform}>{userInfoError}</span>
      </div>
    );
  }

  if (userLogError) {
    return (
      <div className="page">
        <span className="title">{`${userName} (${params.employeeNum})`}</span>
        <span className="btn" onClick={goBackHandler}>
          목록으로
        </span>
        <span className={classes.inform}>{userLogError}</span>
      </div>
    );
  }

  if (!loadedUser) {
    return (
      <div className="page">
        <span className="title">{`${userName} (${params.employeeNum})`}</span>
        <span className="btn" onClick={goBackHandler}>
          목록으로
        </span>
        <span className={classes.inform}>유저 정보를 불러올 수 없습니다.</span>
      </div>
    );
  }

  if (!loadedLogs) {
    return (
      <div className="page">
        <span className="title">{`${userName} (${params.employeeNum})`}</span>
        <span className="btn" onClick={goBackHandler}>
          목록으로
        </span>
        <span className={classes.inform}>유저 로그를 불러올 수 없습니다.</span>
      </div>
    );
  }

  const addUserHandler = (userData) => {
    sendModifyStore(userData);
  };

  return (
    <section className="page">
      <span className="title">{`${userName} (${params.employeeNum})`}</span>
      <span className="btn" onClick={goBackHandler}>
        목록으로
      </span>
      <article className={classes.tabs}>
        <span
          className={`${classes.tab} ${infoActiveStyle()}`}
          onClick={infoClickHandler}
        >
          사용자 정보
        </span>
        <span
          className={`${classes.tab} ${logActiveStyle()}`}
          onClick={logClickHandler}
        >
          사용자 로그
        </span>
      </article>
      {infoStyle && <UserInfo {...loadedUser} onModifyUser={addUserHandler} />}
      {logStyle && <PaymentList payments={loadedLogs.content} />}
      {logStyle && loadedLogs.content.length !== 0 && (
        <Page
          totalElements={loadedLogs.totalElements}
          blockSize={5}
          number={loadedLogs.number}
          size={loadedLogs.size}
          onClick={setPageInfo}
        />
      )}
    </section>
  );
};

export default UserDetailPage;
