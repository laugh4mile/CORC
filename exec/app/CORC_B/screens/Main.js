import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import Card from "../components/Card";
import PaymentItem from "../components/PaymentItem";
import PaymentHistoryIcon from "../navigations/icons/PaymentHistoryIcon";

const SERVER_URL = "http://192.168.0.14:8765/shinhan";

const Main = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const [storeInfo, setStoreInfo] = React.useState({});
  const [paymentList, setPaymentList] = React.useState({});
  const [transacAmount, setTransacAmount] = React.useState({});

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    let response = await axios.get(
      SERVER_URL + "/store/payment?storeId=" + userId
    );
    setStoreInfo(response.data.info);
    setPaymentList(response.data.paymentList);
    // console.log(paymentList.content);

    let response2 = await axios.get(
      SERVER_URL + "/store/payment/total?storeId=" + userId
    );
    setTransacAmount(response2.data);
    setIsLoading(false);
  };

  const now = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    return year + "." + month;
  };

  var currentDate = new Date();
  var dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

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

  const formatMoney = (number) =>
    number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={Colors.primary.backgroundColor}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.storeNameView}>
        <Text style={styles.storeNameViewText}>{storeInfo.storeName}</Text>
      </View>
      <Card style={styles.paymentCard}>
        <View style={{ paddingTop: 10, paddingLeft: 15 }}>
          <Text style={{ color: "gray", fontSize: 13 }}>{now()} 거래 내역</Text>
        </View>
        <View style={styles.paymentTotal}>
          <Text style={{ fontSize: 35 }}>
            {formatMoney(transacAmount.total)} 원
          </Text>
        </View>
        <View style={styles.notConfirmed}>
          <Text style={{ fontSize: 14, color: "gray" }}>
            {"미정산금 "}
            <Text
              style={{
                color: Colors.primary.backgroundColor,
                fontWeight: "bold",
              }}
            >
              {formatMoney(transacAmount.notConfirmed)}
            </Text>
            {" 원"}
          </Text>
        </View>
      </Card>
      <Button
        title="정산하기"
        onPress={() => {
          Alert.alert(null, "서비스 준비 중입니다.\n잠시만 기다려주세요!", [
            { text: "확인" },
          ]);
        }}
        backgroundColor={Colors.primary.backgroundColor}
        fontColor={Colors.primary.fontColor}
      />
      <Card style={styles.recentCard}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 3,
            justifyContent: "center",
            // borderBottomWidth: StyleSheet.hairlineWidth,
            // borderBottomColor: "#737373",
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-end", paddingLeft: 5 }}>
            <PaymentHistoryIcon color={"#b7b7b7"} size="80%" />
          </View>
          <View style={{ flex: 8, paddingLeft: 4 }}>
            <Text style={{ fontWeight: "bold" }}>최근 판매 내역</Text>
          </View>
        </View>
        <View style={styles.recentList}>
          {paymentList.empty ? (
            <Text>최근 거래 내역이 없습니다.</Text>
          ) : (
            paymentList.content.slice(0, 3).map((payment) => (
              <View key={payment.paymentId}>
                {!checkDate(payment.date) && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, color: "#414251" }}>
                        {new Date(payment.date).getMonth() + 1}
                        {"월 "}
                        {new Date(payment.date).getDate()}
                        {"일 ("}
                        {dayOfWeek[new Date(payment.date).getDay()]}
                        {")"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 3,
                        backgroundColor: "#A09E9E",
                        height: 0.7,
                      }}
                    ></View>
                  </View>
                )}
                <PaymentItem
                  key={payment.paymentId}
                  payment={payment}
                  formatMoney={money => formatMoney(money)}
                />
              </View>
            ))
          )}
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: "#737373",
          }}
          onPress={() => {
            props.navigation.navigate("PaymentHistory");
          }}
          activeOpacity={1}
        >
          <Text
            style={{
              color: Colors.primary.backgroundColor,
              fontSize: 15,
              fontWeight: "bold",
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
    paddingHorizontal: "10%",
    backgroundColor: "white",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  storeNameView: {
    flex: 2,
    fontFamily: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  storeNameViewText: {
    fontSize: 30,
  },
  paymentCard: {
    marginHorizontal: 0,
    marginTop: 10,
    marginBottom: "10%",
    flex: 2.2,
  },
  paymentTotal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notConfirmed: {
    alignItems: "flex-end",
    paddingRight: 25,
    paddingBottom: 10,
  },
  recentCard: {
    marginHorizontal: "0%",
    marginTop: "10%",
    marginBottom: "20%",
    flex: 4,
  },
  recentList: {
    flex: 5,
    // alignItems: "stretch",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
