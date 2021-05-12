import { Fragment } from 'react';
// import { useHistory, useLocation } from "react-router-dom";

import Card from '../../components/UI/Card/Card';
import RequestedStoreItem from './RequestedStoreItem';
import classes from './StoreList.module.css';

const sortStores = (stores, ascending) => {
  return stores.sort((storeA, storeB) => {
    if (ascending) {
      return storeA.id - storeB.id;
    } else {
      return storeB.id - storeA.id;
    }
  });
};

const RequestedStoreList = (props) => {
  return (
    <Fragment>
      <Card type="nofit">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="status" />
              </th>
              <th>사업자 등록 번호</th>
              <th>가맹점명</th>
              <th>지역</th>
              <th>업종</th>
              <th>신청 날짜</th>
            </tr>
          </thead>
          {props.stores.map((store) => (
            <RequestedStoreItem key={store.storeId} {...store} />
          ))}
        </table>
      </Card>
    </Fragment>
  );
};

export default RequestedStoreList;
