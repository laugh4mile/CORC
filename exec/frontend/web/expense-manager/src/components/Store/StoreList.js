import { Fragment } from 'react';
// import { useHistory, useLocation } from "react-router-dom";

import Card from '../../components/UI/Card/Card';
import StoreItem from './StoreItem';
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

const StoreList = (props) => {
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
              <th>업종코드</th>
              <th>지역</th>
              <th>미정산 금액</th>
            </tr>
          </thead>
          {props.stores.map((store) => (
            <StoreItem key={store.storeId} {...store} />
          ))}
        </table>
      </Card>
    </Fragment>
  );
};

export default StoreList;
