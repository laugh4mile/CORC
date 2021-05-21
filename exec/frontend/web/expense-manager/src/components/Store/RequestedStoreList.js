import { Fragment, useEffect, useState } from "react";

import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import RequestedStoreItem from "./RequestedStoreItem";
import { storeApplication } from "../../lib/api-store";
import useHttp from "../../hooks/use-http";
import classes from "./List.module.css";

const RequestedStoreList = (props) => {
  const { sendRequest, status } = useHttp(storeApplication);

  const [checkItems, setCheckItems] = useState([]);
  const [storeIdx, setStoreIdx] = useState([]);
  const [stores, setStores] = useState(props.stores);

  const handleSingleCheck = (checked, id, index) => {
    if (checked) {
      setCheckItems([...checkItems, id]);

      const findIdx = storeIdx.indexOf(index);

      if (findIdx > -1) storeIdx.splice(findIdx, 1);
      else storeIdx.push(index);

      setStoreIdx(storeIdx);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((el) => el !== id));
      setStoreIdx(storeIdx.filter((el) => el !== index));
    }
  };

  const handleAllCheck = (checked, index) => {
    if (checked) {
      const idArray = [];
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      props.stores.forEach((el, index) => {
        idArray.push(el.storeId);
        storeIdx.push(index);
      });

      setCheckItems(idArray);
      setStoreIdx([...new Set(storeIdx)]);
    }
    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckItems([]);
      setStoreIdx([]);
    }
  };

  const addUserHandler = (storeStatus, storeIds) => {
    sendRequest({ storeStatus, storeIds });
  };

  const submitHandler = (event) => {
    addUserHandler(event.target.value, checkItems);

    setStoreIdx(storeIdx.reverse());
    storeIdx.forEach((idx) => {
      stores.splice(idx, 1);
    });

    setStores(stores);
    setStoreIdx([]);
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
              <th style={{ width: "10%" }}>
                <input
                  type="checkbox"
                  name="status"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  // checkItems의 개수와 불러오는 데이터가 같을 때, 전체 선택을 활성화
                  // 하나라도 빼면 체크 박스 해제
                  checked={props.page === 0 ? false : checkItems.length === props.page ? true : false}
                />
              </th>
              <th style={{ width: "60%" }}>사업자 등록 번호</th>
              <th>가맹점명</th>
              <th style={{ width: "60%" }}>지역</th>
              <th style={{ width: "80%" }}>업종</th>
              <th style={{ width: "40%" }}>신청 날짜</th>
            </tr>
          </thead>
          {stores.map((store, index) => (
            <RequestedStoreItem
              key={store.storeId}
              {...store}
              index={index}
              handleSingleCheck={handleSingleCheck}
              checkItems={checkItems}
            />
          ))}
        </table>
      </Card>
    </Fragment>
  );
};

export default RequestedStoreList;
