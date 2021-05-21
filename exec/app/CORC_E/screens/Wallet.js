import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../components/Button';
import Card from '../components/Card';
import Payment from '../components/Payment';
import Colors from '../constants/Colors';
import PaymentHistoryIcon from '../components/icons/PaymentHistoryIcon';
import SERVER_URL from '../env';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

var buttonList = [
  { key: 1, label: '당일', value: 1, selected: false },
  { key: 2, label: '1주일', value: 7, selected: true },
  { key: 3, label: '1개월', value: 30, selected: false },
  { key: 4, label: '조건 검색', value: -1, selected: false },
];

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

const dateFrom = (from) => {
  return new Date(new Date().setDate(new Date().getDate() - from + 1));
};

const PaymentHistory = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const [days, setDays] = useState(7);
  const [start, setstart] = useState(dateFrom(30));
  const [end, setend] = useState(new Date());
  const [showStartPicker, setshowStartPicker] = useState(false);
  const [showEndPicker, setshowEndPicker] = useState(false);
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

  const getData = async () => {
    const startDate =
      days === -1 ? dateStrToNum(start) : dateStrToNum(dateFrom(days));
    const endDate = days === -1 ? dateStrToNum(end) : dateStrToNum(new Date());

    const response = await axios.get(
      `${SERVER_URL}/user/payment/custom?userId=${userId}&startDate=${startDate}&endDate=${endDate}&size=${size}&page=${page}`
    );

    let payments = response.data.paymentList.content;

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

  const handleButton = (button) => {
    buttonList.map((btn) => (btn.selected = btn.key === button.key));
    setpage(0);
    setPaymentList([]);
    setstart(dateFrom(30));
    setend(new Date());
    setDays(button.value);
  };

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || start;
    setshowStartPicker(Platform.OS === 'ios');
    setstart(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || end;
    setshowEndPicker(Platform.OS === 'ios');
    setend(currentDate);
  };
  var newDate = new Date();
  var first = true;
  const match = (date) => {
    // false 면 줄을 긋는다.
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
    if (first) {
      newDate = new Date(year, month - 1, day);
      first = false;
      return false;
    }
    newDate = new Date(year, month - 1, day);
    return false;
  };
  const renderList = ({ item }) => {
    return (
      <View>
        {!match(item.date) && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: '#414251' }}>
                {+item.date.substring(5, 7)}월 {+item.date.substring(8, 10)}일
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
          date={item.date}
          store={item.store}
          total={item.total}
          categoryCode={item.store.category.categoryCode}
          paymentitem={item.paymentitem}
        />
      </View>
    );
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setpage(0);
    getData();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.searchView,
          marginBottom: days === -1 ? 120 : 0,
        }}
      >
        <View style={styles.searchButtons}>
          {buttonList.map((button) => (
            <TouchableOpacity
              key={button.key}
              style={{
                ...styles.button,
                backgroundColor: button.selected
                  ? Colors.primary.backgroundColor
                  : Colors.cancel.backgroundColor,
              }}
              activeOpacity={0.8}
              onPress={() => handleButton(button)}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: button.selected
                    ? Colors.primary.fontColor
                    : Colors.cancel.fontColor,
                }}
              >
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {days === -1 && (
          <View style={styles.searchCondition}>
            <View style={styles.dateInput}>
              <TouchableOpacity
                onPress={() => setshowStartPicker(true)}
                style={styles.datePicker}
                activeOpacity={0.7}
              >
                <Text style={styles.datePickerText}>{formatDate(start)}</Text>
                <Icon
                  name="calendar"
                  size={20}
                  color={Colors.primary.backgroundColor}
                />
              </TouchableOpacity>
              <Text
                style={{ fontSize: 20, color: Colors.primary.backgroundColor }}
              >
                ~
              </Text>
              <TouchableOpacity
                onPress={() => setshowEndPicker(true)}
                style={styles.datePicker}
                activeOpacity={0.7}
              >
                <Text style={styles.datePickerText}>{formatDate(end)}</Text>
                <Icon
                  name="calendar"
                  size={20}
                  color={Colors.primary.backgroundColor}
                />
              </TouchableOpacity>
              {showStartPicker && (
                <DateTimePicker
                  value={start}
                  mode="date" // default date
                  display="default"
                  onChange={onChangeStart}
                  maximumDate={new Date()}
                />
              )}
              {showEndPicker && (
                <DateTimePicker
                  value={end}
                  mode="date" // default date
                  display="default"
                  onChange={onChangeEnd}
                  maximumDate={new Date()}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="조회하기"
                onPress={lookUpDate}
                backgroundColor={Colors.primary.backgroundColor}
                fontColor={Colors.primary.fontColor}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.historyLabel}>
        <PaymentHistoryIcon color={'#b7b7b7'} size="30" />
        <Text style={styles.historyText}>판매 내역</Text>
      </View>
      <Card style={styles.resultCard}>
        <FlatList
          data={paymentList}
          renderItem={renderList}
          style={styles.resultScroll}
          keyExtractor={(item, index) => item.paymentId.toString()}
          onEndReached={getData}
          onEndReachedThreshold={1}
          refreshing={isLoading}
          onRefresh={handleRefresh}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
          windowSize={size}
        />
      </Card>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchView: {
    marginTop: '5%',
    paddingHorizontal: '10%',
  },
  searchButtons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
    height: 43,
    borderWidth: 0,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.035,
    fontWeight: 'bold',
  },
  searchCondition: {
    flex: 2,
    flexDirection: 'column',
    marginTop: 10,
  },
  dateInput: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 44,
    width: '45%',
    backgroundColor: Colors.cancel.backgroundColor,
    borderColor: '#dddddd',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
  datePickerText: {
    fontSize: 16,
  },
  historyLabel: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: '3%',
    paddingHorizontal: '10%',
  },
  historyText: {
    fontSize: 22,
    marginLeft: 10,
    color: '#b7b7b7',
    fontWeight: 'bold',
  },
  resultCard: {
    flex: 1,
    marginBottom: '10%',
    marginHorizontal: '10%',
  },
  resultScroll: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  dateSeperatorBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateView: {
    flex: 1,
  },
  dateText: {
    fontSize: windowWidth * 0.033,
    color: '#414251',
  },
  dateSeperator: {
    flex: 3,
    borderBottomColor: '#A09E9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
