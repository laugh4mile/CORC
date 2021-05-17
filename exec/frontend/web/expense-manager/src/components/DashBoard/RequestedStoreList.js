import { Fragment } from 'react';
import React from 'react';

import Card from '../../components/UI/Card/Card';
import RequestedStoreItem from './RequestedStoreItem';
import classes from './List.module.css';

const RequestedStoreList = (props) => {
  console.log('RequestedStoreList', props);
  return (
    <Fragment>
      {/* <Card type="nofit"> */}
      <table>
        <thead>
          <tr className={classes.tr}>
            <th>상호명</th>
            <th>업종</th>
            <th>신청 날짜</th>
          </tr>
        </thead>
        {props.stores.map((store) => (
          <RequestedStoreItem key={store.storeId} {...store} />
        ))}
      </table>
      {/* </Card> */}
    </Fragment>
  );
};

export default RequestedStoreList;