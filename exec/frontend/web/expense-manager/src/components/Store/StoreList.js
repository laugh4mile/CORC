import { Fragment } from "react";
import React, { useEffect, useState } from "react";

import { storeApplication, confirmPayment } from "../../lib/api-store";
import useHttp from "../../hooks/use-http";

import StoreItem from "./StoreItem";
import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";

import classes from "./List.module.css";

const StoreList = (props) => {
  const { sendRequest, status } = useHttp(confirmPayment);

  const [checkItems, setCheckItems] = useState([]);

  const addUserHandler = (storeIds) => {
    sendRequest(storeIds);
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      props.stores.forEach((el) => idArray.push(el.storeId));
      setCheckItems(idArray);
    }
    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckItems([]);
    }
  };

  const submitHandler = (event) => {
    addUserHandler(checkItems);
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.section}>
          {/* <button className="btn" value="">
            정지
          </button>
          <button className="btn" value="">
            삭제
          </button> */}
          <Button small fit>
            정산
          </Button>
        </div>
        <Card type="nofit">
          <table>
            <thead>
              <tr className={classes.tr}>
                <th style={{ width: "10%" }}>
                  <input
                    type="checkbox"
                    name="status"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    // checkItems의 갯 수와 불러오는 데이터가 같을 때, 전체 선택을 활성화
                    // 하나라도 빼면 체크 박스 해제
                    checked={checkItems.length === props.page ? true : false}
                  />
                </th>
                <th style={{ width: "60%" }}>사업자 등록 번호</th>
                <th>가맹점명</th>
                <th style={{ width: "40%" }}>업종코드</th>
                <th style={{ width: "60%" }}>지역</th>
                <th style={{ width: "60%" }}>미정산 금액</th>
              </tr>
            </thead>
            {props.stores.map((store) => (
              <StoreItem key={store.storeId} {...store} handleSingleCheck={handleSingleCheck} checkItems={checkItems} />
            ))}
          </table>
        </Card>
      </form>
    </Fragment>
  );
};

export default StoreList;
