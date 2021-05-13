import { Fragment } from 'react';
import React, { useEffect, useState } from 'react';
// import { useHistory, useLocation } from "react-router-dom";

import Card from '../../components/UI/Card/Card';
import RequestedStoreItem from './RequestedStoreItem';
import { storeApplication } from '../../lib/api-store';
import useHttp from '../../hooks/use-http';
import classes from './List.module.css';

const RequestedStoreList = (props) => {
  const { sendRequest, status } = useHttp(storeApplication);

  const [checkItems, setCheckItems] = useState([]);

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
      console.log('wow');
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

  const addUserHandler = (storeStatus, storeIds) => {
    sendRequest({ storeStatus, storeIds });
  };

  const submitHandler = (event) => {
    // event.preventDefault();
    // console.log('event.target', event.target);
    // console.log('event', event);
    addUserHandler(state.button, checkItems);
  };

  const state = {
    button: 1,
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <div className={classes.section}>
          <button
            className="btn"
            name="allow"
            value="2"
            onClick={() => (state.button = 2)}
          >
            Allow
          </button>
          <button
            className="btn"
            name="deny"
            value="0"
            onClick={() => (state.button = 0)}
          >
            Deny
          </button>
        </div>
        <Card type="nofit">
          <table>
            <thead>
              <tr className={classes.tr}>
                <th className={classes.checkbox}>
                  <input
                    type="checkbox"
                    name="status"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    // checkItems의 갯 수와 불러오는 데이터가 같을 때, 전체 선택을 활성화
                    // 하나라도 빼면 체크 박스 해제
                    // checked={checkItems.length === props.page ? true : false}
                    checked={
                      props.page === 0
                        ? false
                        : checkItems.length === props.page
                        ? true
                        : false
                    }
                  />
                </th>
                <th>사업자 등록 번호</th>
                <th>가맹점명</th>
                <th>지역</th>
                <th>업종</th>
                <th>신청 날짜</th>
              </tr>
            </thead>
            {props.stores.map((store) => (
              <RequestedStoreItem
                key={store.storeId}
                {...store}
                handleSingleCheck={handleSingleCheck}
                checkItems={checkItems}
              />
            ))}
          </table>
        </Card>
      </form>
    </Fragment>
  );
};

export default RequestedStoreList;
