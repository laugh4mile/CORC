import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./RegisterForm.module.css";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";

const RegisterForm = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [enteredName, setName] = useState("");
  const [enteredContact, setContact] = useState("");
  const [enteredPosition, setPosition] = useState({
    enteredDepartment: "",
    enteredRole: "",
  });
  const [enteredLimit, setLimit] = useState("");
  const [enteredArea, setArea] = useState({
    enteredCity: "",
    enteredBorough: "",
  });
  const [enteredDays, setDays] = useState([]);

  const days = [
    { id: 1, value: "월" },
    { id: 2, value: "화" },
    { id: 3, value: "수" },
    { id: 4, value: "목" },
    { id: 5, value: "금" },
    { id: 6, value: "토" },
    { id: 7, value: "일" },
  ];

  const changeHandler = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "name":
        setName(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "department":
        setPosition({ ...enteredPosition, enteredDepartment: value });
        break;
      case "role":
        setPosition({ ...enteredPosition, enteredRole: value });
        break;
      case "limit":
        setLimit(value);
        break;
      case "city":
        setArea({ ...enteredArea, city: value });
        break;
      case "borough":
        setArea({ ...enteredArea, borough: value });
        break;
      case "day":
        setDays(value);
        break;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
  };

  return (
    <section>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={classes.container}>
            <article className={classes.section}>
              <div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={enteredEmail}
                  onChange={changeHandler}
                  label="아이디"
                />
              </div>
              <div>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={enteredPassword}
                  onChange={changeHandler}
                  label="비밀번호"
                />
              </div>
              <div>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={enteredName}
                  onChange={changeHandler}
                  label="이름"
                />
              </div>
              <div>
                <Input
                  type="text"
                  id="contact"
                  name="contact"
                  required
                  value={enteredContact}
                  onChange={changeHandler}
                  label="전화번호"
                />
              </div>
            </article>
            <article className={classes.section}>
              <div>
                <label className={classes.label}>Position</label>
                <div className={classes.control}>
                  <select
                    type="text"
                    id="department"
                    name="department"
                    required
                    value={enteredPosition.enteredDepartment}
                    onChange={changeHandler}
                  >
                    <option value="">부서</option>
                    <option value="디지털개발">디지털 개발부</option>
                    <option value="인사">인사부</option>
                  </select>
                  <select
                    type="text"
                    id="role"
                    name="department"
                    required
                    value={enteredPosition.enteredRole}
                    onChange={changeHandler}
                  >
                    <option value="">직위</option>
                    <option value="수석">수석</option>
                    <option value="선임">선임</option>
                    <option value="선임">주임</option>
                  </select>
                </div>
              </div>
              <div>
                <Input
                  type="number"
                  id="limit"
                  name="limit"
                  min="0"
                  required
                  value={enteredLimit}
                  onChange={changeHandler}
                  label="한도"
                />
              </div>
              <div>
                <label className={classes.label}>지역</label>
                <div className={classes.control}>
                  <select
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={enteredArea.enteredCity}
                    onChange={changeHandler}
                  >
                    <option value="">시/도</option>
                    <option value="디지털개발">서울특별시</option>
                    <option value="인사">경기도</option>
                  </select>
                  <select
                    type="text"
                    id="borough"
                    name="borough"
                    required
                    value={enteredArea.enteredBorough}
                    onChange={changeHandler}
                  >
                    <option value="">구/군</option>
                    <option value="수석">강남구</option>
                    <option value="선임">서초구</option>
                    <option value="선임">송파구</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={classes.label}>사용 가능 요일</label>
                <div className={classes.control}>
                  {days.map((day) => (
                    <label className={classes.label}>
                      <input
                        type="checkbox"
                        id="day"
                        name="day"
                        value={day.id}
                        onChange={changeHandler}
                      />
                      {day.value}
                    </label>
                  ))}
                </div>
              </div>
            </article>
          </div>
          <div className={classes.buttons}>
            {!isLoading && <Button>등록</Button>}
            {/* {<Button sub>취소</Button>} */}
            {isLoading && (
              <span className={classes["text-sm"]}>등록 중...</span>
            )}
          </div>
        </form>
      </Card>
    </section>
  );
};

export default RegisterForm;
