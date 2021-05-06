import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import axios from 'axios';

export default function Home() {
  const userId = useSelector((state) => state.auth.userId);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [payment, setPayment] = useState();

  const SERVER_URL = 'http://192.168.219.101:8765/shinhan/';
  useEffect(() => {
    (async () => {
      let response = await axios.get(
        SERVER_URL + 'admin/user/info?userId=' + userId
      );
      setUserInfo(response.data);

      let response2 = await axios.get(
        SERVER_URL + 'admin/user/payment?userId=' + userId
      );
      setPayment(response2.data);
      console.log('payment : ', response2.data);
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
        <Text>남은 한도 / 총 한도</Text>
        <Text>{userInfo.info.balance}</Text>
        <Text>/{userInfo.info.cardLimit} 원</Text>
      </Card>
      <Text>최근 이용 내역</Text>
      <Card
        style={{
          // marginHorizontal: 0,
          marginTop: 10,
          marginBottom: '10%',
          flex: 3,
        }}
      >
        {/* <Text>{payment.payment}</Text> */}
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
    fontSize: 28,
  },
});
