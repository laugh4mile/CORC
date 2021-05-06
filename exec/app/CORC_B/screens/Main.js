import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import PaymentHistoryIcon from '../navigations/icons/PaymentHistoryIcon';

const Main = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const [storeInfo, setStoreInfo] = React.useState({});
  const [paymentList, setPaymentList] = React.useState({});
  const [transacAmount, setTransacAmount] = React.useState({});

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      let response = await axios.get(
        'http://192.168.0.14:8765/shinhan/store/payment?storeId=' + userId
      );
      // console.log(response.data)
      setStoreInfo(response.data.info);
      setPaymentList(response.data.paymentList);

      let response2 = await axios.get(
        'http://192.168.0.14:8765/shinhan/store/payment/total?storeId=' + userId
      );
      // console.log(response2.data)
      setTransacAmount(response2.data);
      setIsLoading(false);
    })();
  }, []);

  const now = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    return year + '.' + month;
  };

  if (isLoading) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          fontFamily: 'bold',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 30 }}>{storeInfo.storeName}</Text>
      </View>
      <Card
        style={{
          marginHorizontal: 0,
          marginTop: 10,
          marginBottom: '10%',
          flex: 2.2,
        }}
      >
        <View style={{ paddingTop: 10, paddingLeft: 15 }}>
          <Text style={{ color: 'gray', fontSize: 13 }}>{now()} 거래 내역</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 35 }}>{transacAmount.total} 원</Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            paddingRight: 25,
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 14, color: 'gray' }}>
            {'미정산금 '}
            <Text
              style={{
                color: Colors.primary.backgroundColor,
                fontWeight: 'bold',
              }}
            >
              {transacAmount.notConfirmed}
            </Text>
            {' 원'}
          </Text>
        </View>
      </Card>
      <Button
        title="정산하기"
        onPress={() => {
          Alert.alert(null, '잠시만 기다려주세요!', [{ text: '확인' }]);
        }}
        backgroundColor={Colors.primary.backgroundColor}
        fontColor={Colors.primary.fontColor}
      />
      <Card
        style={{
          marginHorizontal: '0%',
          marginTop: '10%',
          marginBottom: '20%',
          flex: 4,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: '#737373',
          }}
        >
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <PaymentHistoryIcon color={'#b7b7b7'} size="60%" />
          </View>
          <View style={{ flex: 6, paddingLeft: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>최근 판매 내역</Text>
          </View>
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          {paymentList.empty && <Text>최근 거래 내역이 없습니다.</Text>}
          {!paymentList.empty && <Text>최근 거래 내역 보여주기</Text>}
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#737373',
          }}
          onPress={() => {
            props.navigation.navigate('PaymentHistory');
          }}
          activeOpacity={1}
        >
          <Text
            style={{
              color: Colors.primary.backgroundColor,
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            상세 내역 보러 가기
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: 'white',
    // marginTop: 20,
    // justifyContent: "space-between",
  },
});
