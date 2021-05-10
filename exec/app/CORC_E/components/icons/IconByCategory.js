import React from 'react';
import StoreIcon from './StoreIcon';
import CoffeeIcon from './CoffeeIcon';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const GetIcon = (categoryCode) => {
  // console.log('code', categoryCode);
  let iconName = '';
  switch (categoryCode) {
    case '10302':
      // 과실 및 그 외 채소 절임식품 제조업
      iconName = 'back';
      return <AntDesign name="down" size={24} color="black" />;
    case '47121':
      // 슈퍼마켓
      iconName = 'retweet';
      break;
    case '47122':
      // 체인화 편의점
      iconName = 'shrink';
      break;

    default:
      iconName = 'left';
      break;
  }
  return iconName;
};
