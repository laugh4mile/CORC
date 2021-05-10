import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import StoreIcon from './icons/StoreIcon';
import CoffeeIcon from './icons/CoffeeIcon';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';
import * as Icon from './icons/IconByCategory';

function Payment({ date, store, total, categoryCode }) {
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

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  // var iconName = {};
  function getIconName(categoryCode) {
    const iconName = Icon.GetIcon(categoryCode);
    console.log('iconName : ', iconName);
    return iconName;
  }
  return (
    <View>
      {/* <Text>{date}</Text> */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}
      >
        <View style={{ justifyContent: 'center', marginRight: 20 }}>
          {getIconName(categoryCode).family == 'StoreIcon' && (
            <StoreIcon color={'#414251'} size={27} />
          )}
          {getIconName(categoryCode).family == 'CoffeeIcon' && (
            <CoffeeIcon color={'#414251'} size={27} />
          )}
          {getIconName(categoryCode).family == 'MaterialCommunityIcons' && (
            <MaterialCommunityIcons
              name={getIconName(categoryCode).iconName}
              size={24}
              color="#414251"
            />
          )}
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 18, color: '#414251' }}>
            {store.storeName}
          </Text>
          <Text style={{ color: '#7B7A7A' }}>{time}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 17, color: '#414251' }}>
              {numberWithCommas(total)}
            </Text>
            <Text style={{ marginLeft: 5, color: '#414251' }}>원</Text>
          </View>
          <Text style={{ color: '#7B7A7A' }}>결제</Text>
        </View>
      </View>
    </View>
  );
}

Payment.propTypes = {};

export default Payment;
