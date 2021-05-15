import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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

  const SERVER_URL = 'http://192.168.0.2:8765/shinhan/';

  // 조건 검색
  var buttonList = [
    { key: 1, label: '당일', value: 1, selected: false },
    { key: 2, label: '1주일', value: 7, selected: true },
    { key: 3, label: '1개월', value: 30, selected: false },
    { key: 4, label: '조건 검색', value: -1, selected: false },
  ];
  const dateFrom = (from) => {
    return new Date(new Date().setDate(new Date().getDate() - from + 1));
  };
  const [paymentList, setPaymentList] = useState();
  const [days, setDays] = useState(7);
  const [start, setstart] = useState(dateFrom(30));
  const [end, setend] = useState(new Date());
  const [size, setsize] = useState(20);
  const [page, setpage] = useState(0);
  const [isSent, setisSent] = useState(false);

  useEffect(() => {
    if (days !== -1) {
      getData();
    }
  }, [days]);

  useEffect(() => {
    isSent && getData();
  }, [isSent]);

  const dateStrToNum = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return +(year + month + day);
  };

  const getData = async () => {
    const startDate =
      days === -1 ? dateStrToNum(start) : dateStrToNum(dateFrom(days));
    const endDate = days === -1 ? dateStrToNum(end) : dateStrToNum(new Date());

    console.log(userId, startDate, endDate, size, page);

    const response = await axios.get(
      `${SERVER_URL}user/payment/custom?userId=${userId}&startDate=${startDate}&endDate=${endDate}&size=${size}&page=${page}`
    );
    // console.log(response.data);
    let payments = response.data.paymentList.content;
    let last = response.data.paymentList.last;

    setPaymentList([...paymentList, ...payments]);
    setpage(page + 1);

    setIsLoading(false);
    setisSent(false);
  };

  const formatDate = (date, type) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    if (type == 'end') {
      return `${year}.${month}.${day} 23:59`;
    }
    if (type == 'start') {
      return `${year}.${month}.${day} 00:00`;
    }
    return `${year}.${month}.${day}`;
  };

  const lookUpDate = () => {
    setPaymentList([]);
    setpage(0);
    if (start > end) {
      return Alert.alert(null, '조회하고자 하는 날짜를 다시 확인해 주세요!', [
        { text: '확인' },
      ]);
    }
    setisSent(true);
  };

  // 조건 검색 끝

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  var first = true;
  const match = (date) => {
    const year = date.substring(0, 4);
    const month = +date.substring(5, 7);
    const day = +date.substring(8, 10);
    if (first) {
      if (year == newDate.getFullYear()) {
        if (month == newDate.getMonth() + 1) {
          if (day == newDate.getDate()) {
            first = false;
            return false;
          }
        }
      }
    } else {
      if (year == newDate.getFullYear()) {
        if (month == newDate.getMonth() + 1) {
          if (day == newDate.getDate()) {
            return true;
          }
        }
      }
    }
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
      console.log('paymentList ===> : ', response2.data);
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
        {/* <View
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
        </View> */}
        {/* <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <Text style={{ color: 'gray', fontSize: 13, marginLeft: 6 }}>
            남은 한도 / 총 한도
          </Text>
        </View> */}
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
            marginVertical: 10,
          }}
        >
          <View style={{ flex: 1, alignItems: 'stretch' }}>
            {payment.paymentList.content.map((payment, index) => (
              <View key={payment.paymentId}>
                {!match(payment.date) && (
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
                  key={payment.paymentId}
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
    // paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
    paddingHorizontal: '10%',
  },
  contents: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});
