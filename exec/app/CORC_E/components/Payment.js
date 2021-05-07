import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import StoreInfo from './StoreInfo';

function Payment({ date, store, total }) {
  const now = () => {
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    return year + '.' + month;
  };
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const time = date.substring(11, 16);
  return (
    <View>
      {/* <Text>{date}</Text> */}
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 18 }}>{store.storeName}</Text>
          <Text>{time}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 17 }}>{total}</Text>
            <Text>{'  '}원</Text>
          </View>
          <Text>결제</Text>
        </View>
      </View>
    </View>
  );
}

Payment.propTypes = {};

export default Payment;
