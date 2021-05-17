import React, { useState, useEffect } from "react";
import { getVerifiedUser, getVerifiedStore, getVerifiedPayment } from "../../lib/api-dashboard";

import stateNormal from "../../assets/normal.png";
import stateDanger from "../../assets/danger.png";

const VerifiedDataChart = () => {
  const [data, setData] = useState({
    user: { verified: 0, total: 0, failedList: [] },
    store: { verified: 0, total: 0, failedList: [] },
    payment: { verified: 0, total: 0, failedList: [] },
  });

  const isSafe = () => {
    return (
      data.user.verified == data.user.total && data.store.verified == data.store.total && data.payment.verified == data.payment.verified
    );
  };

  const setVerifiedData = async () => {
    const tmp = {};
    tmp.user = await getVerifiedUser();
    tmp.store = await getVerifiedStore();
    tmp.payment = await getVerifiedPayment();
    setData(tmp);
  };

  useEffect(() => {
    setVerifiedData();
  }, []);

  return (
    <div>
      <img src={isSafe() ? stateNormal : stateDanger} style={{ width: "100px", height: "100px" }}></img>
      <div>
        <div>검증되지 않은 데이터: {data.user.failedList.length + data.store.failedList.length + data.payment.failedList.length}</div>
      </div>
      <div>
        <div>미검증 사용자: {data.user.failedList.length}</div>
        <div>미검증 가맹점: {data.store.failedList.length}</div>
        <div>미검증 결제: {data.payment.failedList.length}</div>
      </div>
    </div>
  );
};

export default VerifiedDataChart;
