import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import axios from 'axios';
import Payment from '../components/Payment';
import PaymentHistoryIcon from '../components/icons/PaymentHistoryIcon';
export default function Home() {
  const userId = useSelector((state) => state.auth.userId);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [payment, setPayment] = useState();

  const SERVER_URL = 'http://192.168.219.102:8765/shinhan/';

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
      <View style={styles.contents}>
        <Text style={styles.intro}>
          안녕하세요, {userInfo.info.userName} 님
        </Text>
      </View>
      <Card
        style={{
          // marginHorizontal: 0,
          marginTop: 10,
          marginBottom: '10%',
          flex: 2,
        }}
      >
        <View style={{ paddingTop: 10, paddingLeft: 15 }}>
          <Text style={{ color: 'gray', fontSize: 13 }}>
            남은 한도 / 총 한도
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 35 }}>{userInfo.info.balance}</Text>
          <Text style={{ fontSize: 24 }}> {'  '}원</Text>
        </View>

        <View
          style={{
            alignItems: 'flex-end',
            paddingRight: 25,
            paddingBottom: 10,
          }}
        >
          <Text>/ {userInfo.info.cardLimit} 원</Text>
        </View>
      </Card>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'flex-start',
          // borderBottomColor: '#737373',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <PaymentHistoryIcon color={'#b7b7b7'} size="60%" />
          </View> */}
          <PaymentHistoryIcon color={'#000000'} size="40" />
          <View>
            <Text style={{ fontSize: 24, marginLeft: 20 }}>최근 이용 내역</Text>
          </View>
        </View>
      </View>
      <Card
        style={{
          // marginHorizontal: 10,
          // marginTop: 10,
          marginBottom: '10%',
          flex: 3,
        }}
      >
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1, alignItems: 'stretch' }}>
            {payment.paymentList.content.map((payment) => (
              <Payment
                key={payment.paymentId}
                date={payment.date}
                store={payment.store}
                total={payment.total}
              />
            ))}
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
    paddingHorizontal: '10%',
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  intro: {
    fontSize: 24,
  },
});
