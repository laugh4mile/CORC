import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

function StoreInfo({ paymentId, storeName }) {
  return (
    <View>
      <Text>{paymentId}</Text>
      <Text>{storeName}</Text>
    </View>
  );
}

StoreInfo.propTypes = {};

export default StoreInfo;
