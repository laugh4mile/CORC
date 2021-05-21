import { useState, useContext } from "react";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";

import { login } from "../../lib/api-auth";

const AuthForm = () => {
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    login(email, password)
      .then((data) => {
        setIsLoading(false);
        if (!!!data["auth-token"]) {
          alert("로그인 실패");
          return;
        }
        authCtx.login(data["auth-token"]);
      })
      .catch((err) => {
        alert("로그인 실패");
      });
    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <div className={classes.logo}>
        <span className={classes.title}>코르크</span>
        <span className={classes.subtitle}>
          for <span className={classes.bold}>Administrator</span>
        </span>
      </div>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <Input type="email" id="email" value={email} onChange={emailChangeHandler} label="아이디" required />
          <Input type="password" id="password" value={password} onChange={passwordChangeHandler} label="비밀번호" required />
          <div className={classes.actions}>
            {!isLoading && <Button>로그인</Button>}
            {isLoading && <span className={classes["text-sm"]}>로그인 중...</span>}
          </div>
        </form>
      </Card>
    </section>
  );
};

export default AuthForm;
