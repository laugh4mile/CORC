import { useState, useEffect, Fragment } from "react";
import { Prompt } from "react-router-dom";

import classes from "./RegisterForm.module.css";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";

import { getCities, getRegions } from "../../lib/api-user";

const RegisterForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const [enteredEmployeeNum, setEmployeeNum] = useState("");
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
  const [cities, setCities] = useState([]);
  const [guguns, setGuguns] = useState([]);

  const days = [
    { id: 1, value: "월" },
    { id: 2, value: "화" },
    { id: 3, value: "수" },
    { id: 4, value: "목" },
    { id: 5, value: "금" },
    { id: 6, value: "토" },
    { id: 7, value: "일" },
  ];

  const departments = [
    { id: 10, value: "인사부" },
    { id: 20, value: "총무부" },
    { id: 30, value: "디지털 개발부" },
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
      case "employeeNum":
        setEmployeeNum(value);
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
        setArea({ ...enteredArea, enteredCity: value });
        break;
      case "borough":
        setArea({ ...enteredArea, enteredBorough: value });
        break;
      case "day":
        const findIdx = enteredDays.indexOf(value);
        if (findIdx > -1) enteredDays.splice(findIdx, 1);
        else enteredDays.push(value);
        enteredDays.sort();
        setDays(enteredDays);
        break;
      default:
        break;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsEntering(false);

    let transformedDays = "";
    for (let i = 1; i <= 7; i++) {
      const findIdx = enteredDays.indexOf(i.toString());
      if (findIdx > -1) transformedDays += "1";
      else transformedDays += "0";
    }

    const userData = {
      employeeNum: enteredEmployeeNum,
      email: enteredEmail,
      userName: enteredName,
      password: enteredPassword,
      department: enteredPosition.enteredDepartment,
      position: enteredPosition.enteredRole,
      contact: enteredContact,
      days: transformedDays,
      sidoCode: enteredArea.enteredCity,
      gugunCode: enteredArea.enteredBorough,
      cardLimit: enteredLimit,
    };

    console.log(userData);
    props.onAddUser(userData);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  useEffect(() => {
    getCities()
      .then((rs) => setCities(rs))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (enteredArea.enteredCity != "") {
      getRegions(enteredArea.enteredCity)
        .then((rs) => setGuguns(rs))
        .catch((err) => console.log(err));
    }
    setGuguns([]);
  }, [enteredArea.enteredCity]);

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "사용자 등록 페이지에서 벗어나시겠습니까? 입력된 데이터는 손실될 수 있습니다."
        }
      />
      <Card type={"nofit"}>
        <form onFocus={formFocusedHandler} onSubmit={submitHandler}>
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
                  id="employeeNum"
                  name="employeeNum"
                  required
                  value={enteredEmployeeNum}
                  onChange={changeHandler}
                  label="사원 번호"
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
                  placeholder="010-XXXX-XXXX"
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
                    {departments.map((department) => (
                      <option key={department.value} value={department.value}>
                        {department.value}
                      </option>
                    ))}
                  </select>
                  <select
                    type="text"
                    id="role"
                    name="role"
                    required
                    value={enteredPosition.enteredRole}
                    onChange={changeHandler}
                  >
                    <option value="">직위</option>
                    <option value="수석">수석</option>
                    <option value="선임">선임</option>
                    <option value="주임">주임</option>
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
                  label="한도 (원)"
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
                    {cities.map((city) => (
                      <option key={city.sidoCode} value={city.sidoCode}>
                        {city.sidoName}
                      </option>
                    ))}
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
                    {guguns.map((gugun) => (
                      <option key={gugun.gugunCode} value={gugun.gugunCode}>
                        {gugun.gugunName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={classes.label}>사용 가능 요일</label>
                <div className={classes.control}>
                  {days.map((day) => (
                    <label
                      className={`${classes.label} ${classes.checkbox}`}
                      key={day.id}
                    >
                      <input
                        className={`${classes.checkboxStyles}`}
                        type="checkbox"
                        // id="day"
                        name="day"
                        value={day.id}
                        onChange={changeHandler}
                      />
                      <span>{day.value}</span>
                    </label>
                  ))}
                </div>
              </div>
            </article>
          </div>
          <div className={classes.buttons}>
            <Button>등록</Button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default RegisterForm;
