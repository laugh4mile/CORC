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
      // 임시 prompt
      alert("유저 등록 완료")
      history.push("/user/list");
    }
  }, [status, history]);

  const addUserHandler = (userData) => {
    sendRequest(userData);
  };

  return (
    <div className="page">
      <span className="title">사용자 등록</span>
      <RegisterForm
        isLoading={status === "pending"}
        onAddUser={addUserHandler}
      />
    </div>
  );
};

export default UserRegisterPage;
