export const GetIcon = (categoryCode) => {
  let iconInfo = {};
  switch (categoryCode) {
    case '10302':
      // 과실 및 그 외 채소 절임식품 제조업
      iconInfo.iconName = 'food-apple-outline';
      iconInfo.family = 'MaterialCommunityIcons';
      break;
    case '10502':
      // 아이스크림 및 기타 식용 빙과류 제조업
      iconInfo.iconName = 'ice-cream-outline';
      iconInfo.family = 'Ionicons';
      break;
    case '10712':
      // 빵류 제조업
      iconInfo.iconName = 'bread-slice-outline';
      iconInfo.family = 'MaterialCommunityIcons';
      break;
    case '56213':
      // 생맥주 전문점
      iconInfo.iconName = 'beer-outline';
      iconInfo.family = 'Ionicons';
      break;
    case '47121':
      // 슈퍼마켓
      iconInfo.iconName = 'store';
      iconInfo.family = 'StoreIcon';
      break;
    case '47122':
      // 체인화 편의점
      iconInfo.iconName = 'store';
      iconInfo.family = 'StoreIcon';
      break;
    case '47711':
      // 운송장비용 주유소 운영업
      iconInfo.iconName = 'gas-station-outline';
      iconInfo.family = 'MaterialCommunityIcons';
      break;
    case '55101':
      // 호텔업
      iconInfo.iconName = 'business-outline';
      iconInfo.family = 'Ionicons';
      break;
    case '56111':
      // 한식 일반 음식점업
      iconInfo.iconName = 'restaurant-outline';
      iconInfo.family = 'Ionicons';
      break;
    case '56192':
      // 피자, 햄버거, 샌드위치 및 유사 음식점업
      iconInfo.iconName = 'fast-food-outline';
      iconInfo.family = 'Ionicons';
      break;
    case '56193':
      // 치킨 전문점
      iconInfo.iconName = 'food-drumstick-outline';
      iconInfo.family = 'MaterialCommunityIcons';
      break;
    case '56219':
      // 기타 주점업
      iconInfo.iconName = 'beer-outline';
      iconInfo.family = 'Ionicons';
      break;
    case '56221':
      // 커피 전문점
      iconInfo.iconName = 'coffee';
      iconInfo.family = 'CoffeeIcon';
      break;
    case '61100':
      // 공영 우편업
      iconInfo.iconName = 'mail-open-outline';
      iconInfo.family = 'Ionicons';
      break;

    default:
      // 기본 : 슈퍼마켓 아이콘
      iconInfo.iconName = 'store';
      iconInfo.family = 'StoreIcon';
      break;
  }
  return iconInfo;
};
