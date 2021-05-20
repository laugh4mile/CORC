import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import PaymentItem from "../components/PaymentItem";
import PaymentHistoryIcon from "../navigations/icons/PaymentHistoryIcon";
import { SERVER_URL } from "../env";

const { width } = Dimensions.get("window");

const getCurrentMonth = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return year + "." + month;
};

const formatMoney = (number) =>
  number !== null && +number >= 0
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : null;

const Main = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const [storeInfo, setStoreInfo] = React.useState({});
  const [paymentList, setPaymentList] = React.useState({});
  const [transacAmount, setTransacAmount] = React.useState({});

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    setIsLoading(true);
    let response = await axios.get(
      SERVER_URL + "/store/payment?storeId=" + userId
    );
    setStoreInfo(response.data.info);
    setPaymentList(response.data.paymentList);

    let response2 = await axios.get(
      SERVER_URL + "/store/payment/total?storeId=" + userId
    );
    setTransacAmount(response2.data);
    setIsLoading(false);
  };

  var currentDate = new Date(1900, 0, 1);

  const checkDate = (date) => {
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
          <Text style={{ color: "gray", fontSize: 13 }}>
            {getCurrentMonth()} 거래 내역
          </Text>
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
                fontSize: 16,
              }}
            >
              {formatMoney(transacAmount.notConfirmed)}
            </Text>
            {" 원"}
          </Text>
        </View>
      </Card>
      <Card style={styles.recentCard}>
        <View style={styles.recentCardHeader}>
          <View style={styles.recentCardHeaderIcon}>
            <PaymentHistoryIcon color={"#3f3f42"} size="80%" />
          </View>
          <View style={{ flex: 8, paddingLeft: 4 }}>
            <Text style={{ fontWeight: "bold", color: "#3f3f42" }}>
              최근 판매 내역
            </Text>
          </View>
        </View>
        <View style={styles.recentList}>
          <ScrollView style={{ paddingHorizontal: 10 }}>
            {paymentList.empty ? (
              <Text style={styles.emptyListTest}>거래 내역이 없습니다.</Text>
            ) : (
              paymentList.content.slice(0, 5).map((payment, index) => (
                <View key={payment.paymentId.toString()}>
                  {!checkDate(payment.date) && (
                    <View
                      style={{
                        ...styles.dateSeparator,
                        marginTop: index !== 0 ? "2%" : 0,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.dateSeparatorText}>
                          {+payment.date.substring(5, 7)}
                          {"월 "}
                          {+payment.date.substring(8, 10)}
                          {"일"}
                        </Text>
                      </View>
                      <View style={styles.dateSeparatorLine} />
                    </View>
                  )}
                  <PaymentItem payment={payment} />
                </View>
              ))
            )}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.goDetail}
          onPress={() => {
            props.navigation.navigate("History", { screen: "PaymentHistory" });
          }}
          activeOpacity={1}
        >
          <Text style={styles.goDetailText}>상세 내역 보러 가기</Text>
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
    backgroundColor: "white",
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
    marginBottom: "7%",
    flex: 2.5,
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
    marginBottom: "15%",
    flex: 5,
  },
  recentCardHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  recentCardHeaderIcon: {
    flex: 1,
    alignItems: "flex-end",
    paddingLeft: 5,
  },
  recentList: {
    flex: 6,
    paddingBottom: 3,
  },
  emptyListTest: {
    marginTop: 10,
    textAlign: "center",
    color: "gray",
  },
  dateSeparator: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateSeparatorText: {
    fontSize: width * 0.033,
    color: "#414251",
  },
  dateSeparatorLine: {
    flex: 3,
    backgroundColor: "#A09E9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#b0b0b0",
  },
  goDetail: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#a7a7a7",
  },
  goDetailText: {
    color: Colors.primary.backgroundColor,
    fontSize: 15,
    fontWeight: "bold",
  },
});
