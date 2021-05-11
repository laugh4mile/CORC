import { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { getSingleUser, getUserPaymentDetails } from "../../lib/api-user";

import UserInfo from "../../components/User/UserInfo";
import UserLog from "../../components/User/UserLog";
import Card from "../../components/UI/Card/Card";

import classes from "./UserDetailPage.module.css";

const UserDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const { userName } = location.state;
  const [infoStyle, setInfoStyle] = useState(true);
  const [logStyle, setLogStyle] = useState(false);

  // console.log("params", params);
  // console.log("state", location.state);

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

  useEffect(() => {
    sendUserInfoRequest(userId);
    sendUserLogRequest(userId);
  }, [sendUserInfoRequest, sendUserLogRequest, userId]);

  if (userInfoStatus === "pending" && userLogStatus === "pending") {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (userInfoError) {
    return <p>{userInfoError}</p>;
  }

  if (userLogError) {
    return <p>{userLogError}</p>;
  }

  if (!loadedUser) {
    return <p>결제 내역이 없습니다.</p>;
  }

  console.log("loadedUser", loadedUser);
  console.log("loadedLogs", loadedLogs);

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
      <Card type={"nofit"}>
        {infoStyle && <UserInfo {...loadedUser} />}
        {logStyle && <UserLog logs={loadedLogs} />}
      </Card>
    </section>
  );
};

export default UserDetailPage;
