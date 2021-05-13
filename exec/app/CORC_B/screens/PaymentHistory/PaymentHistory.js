import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/Button";
import Card from "../../components/Card";
import PaymentItem from "../../components/PaymentItem";
import Colors from "../../constants/Colors";
import PaymentHistoryIcon from "../../navigations/icons/PaymentHistoryIcon";

const SERVER_URL = "http://192.168.0.14:8765/shinhan";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
var buttonList = [
  { key: 1, label: "당일", value: 1, selected: false },
  { key: 2, label: "1주일", value: 7, selected: true },
  { key: 3, label: "1개월", value: 30, selected: false },
  { key: 4, label: "조건 검색", value: -1, selected: false },
];

const getMMDD_DT = (date) => {
  let _date = new Date(date);
  return `${_date.getMonth() + 1}월 ${_date.getDate()}일 (${
    dayOfWeek[_date.getDay()]
  })`;
};

const formatMoney = (number) =>
  number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;

const dateStrToNum = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  return +(year + month + day);
};

const dateFrom = (from) => {
  return new Date(new Date().setDate(new Date().getDate() - from + 1));
};

const formatDate = (date, type) => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  if (type == "end") {
    return `${year}.${month}.${day} 23:59`;
  }
  if (type == "start") {
    return `${year}.${month}.${day} 00:00`;
  }
  return `${year}.${month}.${day}`;
};

const PaymentHistory = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentList, setPaymentList] = useState([]);
  const [days, setDays] = useState(7);
  const [start, setstart] = useState(dateFrom(30));
  const [end, setend] = useState(new Date());
  const [showStartPicker, setshowStartPicker] = useState(false);
  const [showEndPicker, setshowEndPicker] = useState(false);

  useEffect(() => {
    getData();
  }, [days]);

  const getData = async (from, to) => {
    setIsLoading(true);

    if (days !== -1) {
      var response = await axios.get(
        `${SERVER_URL}/store/payment/custom?storeId=${userId}&startDate=${dateStrToNum(
          dateFrom(days)
        )}&endDate=${dateStrToNum(new Date())}`
      );

      var payments = [];

      if (response.data !== undefined && !response.data.paymentList.empty) {
        payments = response.data.paymentList.content;
      }

      setPaymentList(payments);

      setIsLoading(false);
      return;
    }

    if (from && to) {
      if (from > to) {
        setIsLoading(false);
        return Alert.alert(null, "조회하고자 하는 날짜를 다시 확인해 주세요!", [
          { text: "확인" },
        ]);
      }

      var response = await axios.get(
        `${SERVER_URL}/store/payment/custom?storeId=${userId}&startDate=${dateStrToNum(
          from
        )}&endDate=${dateStrToNum(to)}`
      );

      var payments = [];

      if (response.data !== undefined && !response.data.paymentList.empty) {
        payments = response.data.paymentList.content;
      }

      setPaymentList(payments);

      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const lookUpDate = () => {
    console.log(start, end);
    if (days === -1) {
      getData(start, end);
    }
  };

  var currentDate = new Date();

  const checkDate = (date) => {
    const year = +date.slice(0, 4);
    const month = +date.slice(5, 7) - 1;
    const day = +date.slice(8, 10);

    if (year == currentDate.getFullYear()) {
      if (month == currentDate.getMonth()) {
        if (day == currentDate.getDate()) {
          return true;
        }
      }
    }
    currentDate = new Date(year, month, day);
    return false;
  };

  const handleButton = (button) => {
    buttonList.map((btn) => (btn.selected = btn.key === button.key));
    setDays(button.value);
  };

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || start;
    setshowStartPicker(Platform.OS === "ios");
    setstart(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || end;
    setshowEndPicker(Platform.OS === "ios");
    setend(currentDate);
  };

  const showDatePicker = (type) => {
    if (type === "start") {
      setshowStartPicker(true);
    }
    if (type === "end") {
      setshowEndPicker(true);
    }
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
                onPress={() => showDatePicker("start")}
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
                onPress={() => showDatePicker("end")}
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
                  onChange={(event, date) => onChangeStart(event, date)}
                />
              )}
              {showEndPicker && (
                <DateTimePicker
                  value={end}
                  mode="date" // default date
                  display="default"
                  onChange={(event, date) => onChangeEnd(event, date)}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="조회하기"
                onPress={() => lookUpDate()}
                backgroundColor={Colors.primary.backgroundColor}
                fontColor={Colors.primary.fontColor}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.historyLabel}>
        <PaymentHistoryIcon color={"#b7b7b7"} size="30" />
        <Text style={styles.historyText}>판매 내역</Text>
      </View>
      <Card style={styles.resultCard}>
        <ScrollView style={styles.resultScroll}>
          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator
                size="large"
                color={Colors.primary.backgroundColor}
              />
            </View>
          ) : paymentList.length > 0 ? (
            paymentList.map((payment) => (
              <View key={payment.paymentId}>
                {!checkDate(payment.date) && (
                  <View style={styles.dateSeperatorBox}>
                    <View style={styles.dateView}>
                      <Text style={styles.dateText}>
                        {getMMDD_DT(payment.date)}
                      </Text>
                    </View>
                    <View style={styles.dateSeperator} />
                  </View>
                )}
                <PaymentItem
                  payment={payment}
                  formatMoney={(money) => formatMoney(money)}
                />
              </View>
            ))
          ) : (
            <Text>최근 거래 내역이 없습니다.</Text>
          )}
        </ScrollView>
      </Card>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  searchView: {
    marginTop: "5%",
    paddingHorizontal: "10%",
  },
  searchButtons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
    justifyContent: "center",
    height: 43,
    borderWidth: 0,
  },
  buttonText: {
    textAlign: "center",
    fontSize: windowWidth * 0.035,
    fontWeight: "bold",
  },
  searchCondition: {
    flex: 2,
    flexDirection: "column",
    marginTop: 10,
  },
  dateInput: {
    flexDirection: "row",
    height: 50,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  datePicker: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 44,
    width: "45%",
    backgroundColor: Colors.cancel.backgroundColor,
    borderColor: "#dddddd",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    // paddingHorizontal: 10,
  },
  datePickerText: {
    fontSize: 16,
  },
  historyLabel: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: "3%",
    paddingHorizontal: "10%",
  },
  historyText: {
    fontSize: 22,
    marginLeft: 10,
    color: "#b7b7b7",
    fontWeight: "bold",
  },
  resultCard: {
    flex: 1,
    marginBottom: "10%",
  },
  resultScroll: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: "5%",
    paddingTop: "2%",
  },
  dateSeperatorBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%",
  },
  dateView: {
    flex: 1,
  },
  dateText: {
    fontSize: windowWidth * 0.033,
    color: "#414251",
  },
  dateSeperator: {
    flex: 3,
    borderBottomColor: "#A09E9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
