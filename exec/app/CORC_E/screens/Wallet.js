import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import axios from 'axios';
import Payment from '../components/Payment';
import PaymentHistoryIcon from '../components/icons/PaymentHistoryIcon';

const Wallet = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  var newDate = new Date();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [payment, setPayment] = useState();

  const SERVER_URL = 'http://192.168.219.102:8765/shinhan/';

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const match = (date) => {
    const year = date.substring(0, 4);
    const month = +date.substring(5, 7);
    const day = +date.substring(8, 10);
    if (year == newDate.getFullYear()) {
      if (month == newDate.getMonth() + 1) {
        if (day == newDate.getDate()) {
          console.log('패스');
          return true;
        }
      }
    }
    console.log('newDate : ', newDate);
    console.log('좋게좋게 가자 제발 ');
    console.log('결제 날짜 : ', year, '년,', month, '월,', day, '일');
    newDate = new Date(year, month - 1, day);
    return false;
  };

  useEffect(() => {
    (async () => {
      let response = await axios.get(
        SERVER_URL + 'admin/user/info?userId=' + userId
      );
      setUserInfo(response.data);

      let response2 = await axios.get(
        SERVER_URL + 'user/payment?userId=' + userId
      );
      setPayment(response2.data);
      // console.log('paymentList ===> : ', response2.data);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.contents}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: 35,
              color: '#414251',
              // marginBottom: 10,
              paddingBottom: 15,
              fontWeight: 'bold',
            }}
          >
            {numberWithCommas(userInfo.info.balance)}
          </Text>
          <Text
            style={{
              fontSize: 24,
              marginHorizontal: 10,
              color: '#414251',
              paddingBottom: 10,
            }}
          >
            원
          </Text>
          <Text style={{ color: '#414251' }}>
            / {'  '}
            {numberWithCommas(userInfo.info.cardLimit)} 원
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <Text style={{ color: 'gray', fontSize: 13, marginLeft: 6 }}>
            남은 한도 / 총 한도
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.4,
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingBottom: '3%',
        }}
      >
        <PaymentHistoryIcon color={'#414251'} size="30" />
        <Text
          style={{
            fontSize: 22,
            marginLeft: 10,
            color: '#414251',
            fontWeight: 'bold',
          }}
        >
          이용 내역
        </Text>
      </View>
      <Card
        style={{
          marginBottom: '10%',
          flex: 3.5,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1, alignItems: 'stretch' }}>
            {payment.paymentList.content.map((payment, index) => (
              <View>
                {match(payment.date) && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, color: '#414251' }}>
                        {+payment.date.substring(5, 7)}월{' '}
                        {+payment.date.substring(8, 10)}일
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 3,
                        borderBottomColor: '#A09E9E',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                    />
                  </View>
                )}
                <Payment
                  key={index}
                  date={payment.date}
                  store={payment.store}
                  total={payment.total}
                  categoryCode={payment.store.category.categoryCode}
                  paymentitem={payment.paymentitem}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};
export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
    paddingHorizontal: '10%',
  },
  contents: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});
