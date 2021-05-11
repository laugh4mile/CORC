import { Fragment, useState, useEffect } from 'react';

import classes from './StoreInfo.module.css';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const StoreInfo = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [enteredCrNum, setCrNum] = useState(props.crNum);
  const [enteredEmail, setEmail] = useState(props.email);
  const [enteredPassword, setPassword] = useState('');
  const [enteredName, setName] = useState(props.storeName);
  const [enteredContact, setContact] = useState(props.contact);
  const [enteredArea, setArea] = useState({
    enteredCity: props.sido.sidoName,
    enteredBorough: props.gugun.gugunName,
  });
  const [enteredCategory, setCategory] = useState(props.categoryCode);
  const [enteredAccepted, setAccepted] = useState(props.accepted);
  const [enteredAccount, setAccount] = useState(props.account);
  const [enteredBank, setBank] = useState(props.bank);

  const cities = [
    { code: '1100000000', value: '서울특별시' },
    { code: '2600000000', value: '부산광역시' },
    { code: '2700000000', value: '대구광역시' },
    { code: '2800000000', value: '인천광역시' },
    { code: '2900000000', value: '광주광역시' },
    { code: '3000000000', value: '대전광역시' },
    { code: '3100000000', value: '울산광역시' },
    { code: '3611000000', value: '세종특별자치시' },
    { code: '4100000000', value: '경기도' },
    { code: '4200000000', value: '강원도' },
    { code: '4300000000', value: '충청북도' },
    { code: '4400000000', value: '충청남도' },
    { code: '4500000000', value: '전라북도' },
    { code: '4600000000', value: '전라남도' },
    { code: '4700000000', value: '경상북도' },
    { code: '4800000000', value: '경상남도' },
    { code: '5000000000', value: '제주특별자치도' },
  ];

  const changeHandler = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'crNum':
        setCrNum(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'contact':
        setContact(value);
        break;
      case 'city':
        setArea({ ...enteredArea, enteredCity: value });
        break;
      case 'borough':
        setArea({ ...enteredArea, enteredBorough: value });
        break;
      case 'category':
        setCategory(value);
        break;
      case 'accepted':
        setAccepted(value);
        break;
      case 'account':
        setAccount(value);
        break;
      case 'bank':
        setBank(value);
        break;
      default:
        break;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const storeData = {
      crNum: enteredCrNum,
      email: enteredEmail,
      storeName: enteredName,
      password: enteredPassword,
      contact: enteredContact,
      sidoCode: enteredArea.enteredCity,
      gugunCode: enteredArea.enteredBorough,
      category: enteredCategory,
      accepted: enteredAccepted,
      account: enteredAccount,
      bank: enteredBank,
    };

    console.log(storeData);
    props.onAddStore(storeData);
  };

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
                  <option value="">{enteredArea.enteredCity}</option>
                  {cities.map((city) => (
                    <option key={city.code} value={city.code}>
                      {city.value}
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
                  <option value="">{enteredArea.enteredBorough}</option>
                  <option value="1168000000">강남구</option>
                  <option value="1165000000">서초구</option>
                  <option value="1171000000">송파구</option>
                </select>
              </div>
            </div>
            <div>
              <Input
                type="text"
                id="bank"
                name="bank"
                required
                value={setBank}
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
