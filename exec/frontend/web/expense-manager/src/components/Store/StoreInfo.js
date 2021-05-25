import React, { Fragment, useState, useEffect } from "react";

import classes from "./StoreInfo.module.css";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import { getCities, getRegions } from "../../lib/api-user";

const StoreInfo = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [enteredCrNum, setCrNum] = useState(props.crNum);
  const [enteredEmail, setEmail] = useState(props.email);
  const [enteredPassword, setPassword] = useState("");
  const [enteredName, setName] = useState(props.storeName);
  const [enteredContact, setContact] = useState(props.contact);
  const [enteredArea, setArea] = useState({
    enteredCity: props.sido.sidoCode,
    enteredBorough: props.gugun.gugunCode,
  });
  const [enteredCategory, setCategory] = useState(props.categoryCode);
  const [enteredAccepted, setAccepted] = useState(props.accepted);
  const [enteredAccount, setAccount] = useState(props.account);
  const [enteredBank, setBank] = useState(props.bankName);
  const [cities, setCities] = useState([]);
  const [guguns, setGuguns] = useState([]);

  const changeHandler = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "crNum":
        setCrNum(value);
        break;
      case "name":
        setName(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "city":
        setArea({ ...enteredArea, enteredCity: value });
        break;
      case "borough":
        setArea({ ...enteredArea, enteredBorough: value });
        break;
      case "category":
        setCategory(value);
        break;
      case "accepted":
        setAccepted(value);
        break;
      case "account":
        setAccount(value);
        break;
      case "bank":
        setBank(value);
        break;
      default:
        break;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsEntering(false);

    const storeData = {
      crNum: enteredCrNum,
      email: enteredEmail,
      storeName: enteredName,
      password: enteredPassword,
      contact: enteredContact,
      sidoCode: enteredArea.enteredCity,
      gugunCode: enteredArea.enteredBorough,
      categoryCode: enteredCategory,
      accepted: enteredAccepted,
      account: enteredAccount,
      bankName: enteredBank,
    };

    props.onModifyStore(storeData);
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

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
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
                disabled
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
                id="crNum"
                name="crNum"
                required
                value={enteredCrNum}
                onChange={changeHandler}
                label="사업자 등록 번호"
                disabled
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
                label="가맹점명"
                disabled
              />
            </div>
            <div>
              <Input
                type="text"
                id="category"
                name="category"
                required
                value={enteredCategory}
                onChange={changeHandler}
                label="업종코드"
                disabled
              />
            </div>
          </article>
          <article className={classes.section}>
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
              <Input
                type="text"
                id="bank"
                name="bank"
                required
                value={enteredBank}
                onChange={changeHandler}
                label="은행명"
                disabled
              />
            </div>
            <div>
              <Input
                type="text"
                id="account"
                name="account"
                required
                value={enteredAccount}
                onChange={changeHandler}
                label="계좌번호"
                disabled
              />
            </div>
          </article>
        </div>
        <div className={classes.buttons}>
          <Button onClick={finishEnteringHandler}>수정</Button>
        </div>
      </form>
    </Fragment>
  );
};

export default StoreInfo;
