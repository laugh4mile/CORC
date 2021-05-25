import React, { Fragment, useEffect, useState } from "react";

import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import { paymentStatus } from "../../lib/api-store";
import PaymentItem from "./PaymentItem";
import useHttp from "../../hooks/use-http";

import classes from "./List.module.css";

const PaymentList = (props) => {
  const { sendRequest: sendStatus, status: userStatusStatus } =
    useHttp(paymentStatus);

  const [checkItems, setCheckItems] = useState([]);
  const [paymentIdx, setPaymentIdx] = useState([]);
  const [payments, setPayments] = useState(props.payments);

  const handleSingleCheck = (checked, id, index) => {
    if (checked) {
      setCheckItems([...checkItems, id]);

      const findIdx = paymentIdx.indexOf(index);

      if (findIdx > -1) paymentIdx.splice(findIdx, 1);
      else paymentIdx.push(index);

      setPaymentIdx(paymentIdx);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((el) => el !== id));
      setPaymentIdx(paymentIdx.filter((el) => el !== index));
    }
  };

  const handleAllCheck = (checked, index) => {
    if (checked) {
      const idArray = [];
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      props.payments.forEach((el, index) => {
        idArray.push(el.paymentId);
        paymentIdx.push(index);
      });

      setCheckItems(idArray);
      setPaymentIdx([...new Set(paymentIdx)]);
    }
    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckItems([]);
      setPaymentIdx([]);
    }
  };

  const addUserHandler = (paymentStatus, paymentIds) => {
    sendStatus({ paymentStatus, paymentIds });
  };

  const submitHandler = (event) => {
    addUserHandler(event.target.value, checkItems);
    setPayments(payments);
    setPaymentIdx([]);
    window.location.reload();
  };

  return (
    <Fragment>
      <div className={classes.section}>
        <Button small allow fit name="allow" value="2" onClick={submitHandler}>
          승인
        </Button>
        <Button small deny fit name="deny" value="0" onClick={submitHandler}>
          거절
        </Button>
      </div>
      <Card type="nofit">
        <table>
          <thead>
            <tr className={classes.tr}>
              <th style={{ width: "30%", fontSize: "0.875rem" }}>상태</th>
              <th style={{ width: "10%" }}>
                <input
                  type="checkbox"
                  name="status"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  // checkItems의 개수와 불러오는 데이터가 같을 때, 전체 선택을 활성화
                  // 하나라도 빼면 체크 박스 해제
                  checked={
                    props.page === 0
                      ? false
                      : checkItems.length === props.page
                      ? true
                      : false
                  }
                />
              </th>
              <th>가맹점명</th>
              <th style={{ width: "40%" }}>사용자명</th>
              <th style={{ width: "50%" }}>결제 금액</th>
              <th style={{ width: "40%" }}>결제 날짜</th>
              <th style={{ width: "20%" }}>승인 여부</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <PaymentItem
                key={payment.paymentId}
                {...payment}
                index={index}
                handleSingleCheck={handleSingleCheck}
                checkItems={checkItems}
              />
            ))}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default PaymentList;
