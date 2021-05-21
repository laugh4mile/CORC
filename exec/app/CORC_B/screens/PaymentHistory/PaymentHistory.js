import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
  FlatList,
  ActivityIndicator,
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
import { SERVER_URL } from "../../env";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

var buttonList = [
  { key: 1, label: "당일", value: 1, selected: false },
  { key: 2, label: "1주일", value: 7, selected: true },
  { key: 3, label: "1개월", value: 30, selected: false },
  { key: 4, label: "조건 검색", value: -1, selected: false },
];

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
  const [hasMore, sethasMore] = useState(false);

  useEffect(() => {
    handleButton(buttonList[1]); // initialize to one week selected button
  }, []);

  // 당일, 1주일, 1개월 버튼 클릭했을 때
  useEffect(() => {
    if (days !== -1) {
      getData();
    }
  }, [days]);

  // 조건검색을 통해서 '조회하기' 버튼 클릭했을 때
  useEffect(() => {
    isSent && getData();
  }, [isSent]);

  const getData = async () => {
    setIsLoading(true);

    const startDate =
      days === -1 ? dateStrToNum(start) : dateStrToNum(dateFrom(days));
    const endDate = days === -1 ? dateStrToNum(end) : dateStrToNum(new Date());
    currentDate = new Date(1900, 0, 1);

    const response = await axios.get(
      `${SERVER_URL}/store/payment/custom?storeId=${userId}&startDate=${startDate}&endDate=${endDate}&size=${size}&page=${page}`
    );

    let payments = response.data.paymentList.content;

    setPaymentList([...paymentList, ...payments]);
    setpage(page + 1);
    sethasMore(response.data.paymentList.last === false);

    setisSent(false);
    setIsLoading(false);
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

  // 조회하기 버튼
  const lookUpHandler = () => {
    setPaymentList([]);
    setpage(0);
    if (start > end) {
      return Alert.alert(null, "조회하고자 하는 날짜를 다시 확인해 주세요!", [
        { text: "확인" },
      ]);
    }
    sethasMore(true);
    setisSent(true);
  };

  var currentDate = new Date(1900, 0, 1);

  const matchedDate = (date) => {
    const year = +date.slice(0, 4);
    const month = +date.slice(5, 7) - 1;
    const day = +date.slice(8, 10);

    if (
      year == currentDate.getFullYear() &&
      month == currentDate.getMonth() &&
      day == currentDate.getDate()
    ) {
      return true;
    }
    currentDate = new Date(year, month, day);
    return false;
  };

  const handleButton = (button) => {
    buttonList.map((btn) => (btn.selected = btn.key === button.key));
    if (button.value !== days) {
      setpage(0);
      setPaymentList([]);
      setstart(dateFrom(30));
      setend(new Date());
      sethasMore(true);
      setDays(button.value);
    }
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

  const renderList = ({ item }) => {
    return (
      <View>
        {!matchedDate(item.date) && (
          <View style={styles.dateSeparatorBox}>
            <View style={styles.dateView}>
              <Text style={styles.dateText}>
                {+item.date.substring(5, 7)}
                {"월 "}
                {+item.date.substring(8, 10)}
                {"일"}
              </Text>
            </View>
            <View style={styles.dateSeparator} />
          </View>
        )}
        <PaymentItem payment={item} />
      </View>
    );
  };

  const renderEnd = () => {
    if (isLoading) {
      return <ActivityIndicator color={Colors.primary.backgroundColor} />;
    }
    if (days === -1) {
      if (paymentList.length > 0) {
        return (
          <Text style={styles.listFooter}>더 이상 조회할 내역이 없습니다.</Text>
        );
      }
      return (
        <Text style={styles.listFooter}>
          조회할 날짜를 선택하여 조회하기 버튼을 눌러주세요.
        </Text>
      );
    }
    if (paymentList.length > 0) {
      return (
        <Text style={styles.listFooter}>더 이상 조회할 내역이 없습니다.</Text>
      );
    }
    return <Text style={styles.listFooter}>조회할 내역이 없습니다.</Text>;
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
                onPress={lookUpHandler}
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
        <FlatList
          data={paymentList}
          renderItem={renderList}
          style={styles.resultScroll}
          keyExtractor={(item, index) => item.paymentId.toString()}
          onEndReached={() => {
            if (isLoading) {
              return;
            }
            if (hasMore) {
            getData();
            }
          }}
          ItemSeparatorComponent={() => <View style={{ marginBottom: 3 }} />}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{ flexGrow: 1 }}
          ListFooterComponent={renderEnd}
        />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 44,
    width: "45%",
    backgroundColor: Colors.cancel.backgroundColor,
    borderColor: "#dddddd",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
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
    paddingVertical: 10,
  },
  resultScroll: {
    paddingHorizontal: 10,
  },
  dateSeparatorBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  dateView: {
    flex: 1,
  },
  dateText: {
    fontSize: windowWidth * 0.033,
    color: "#414251",
  },
  dateSeparator: {
    flex: 2.5,
    borderBottomColor: "#A09E9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listFooter: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    color: "gray",
  },
});
