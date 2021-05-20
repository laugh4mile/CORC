import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import RegisterForm from "../../components/User/RegisterForm";
import useHttp from "../../hooks/use-http";
import { addUser } from "../../lib/api-user";

const UserRegisterPage = () => {
  const { sendRequest, status } = useHttp(addUser);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      alert("유저 등록 완료");
      history.push("/user/list");
    } else if (status === "error") {
      alert("유저 등록에 실패했습니다. 사원번호를 확인해 주세요.");
    }
  }, [status, history]);

  const addUserHandler = (userData) => {
    sendRequest(userData);
  };

  return (
    <div className="page">
      <span className="title">사용자 등록</span>
      <RegisterForm isLoading={status === "pending"} onAddUser={addUserHandler} />
    </div>
  );
};

export default UserRegisterPage;
