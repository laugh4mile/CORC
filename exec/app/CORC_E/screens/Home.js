import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import axios from "axios";
import Payment from "../components/Payment";
import PaymentHistoryIcon from "../components/icons/PaymentHistoryIcon";
import MoneyIcon from "../components/icons/MoneyIcon";
import Colors from "../constants/Colors";
import SERVER_URL from "../env";

const Home = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  var newDate = new Date();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [payment, setPayment] = useState();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    if (first) {
      newDate = new Date(year, month - 1, day);
      first = false;
      return false;
    }
    newDate = new Date(year, month - 1, day);
    return false;
  };

  useEffect(() => {
    (async () => {
      let response = await axios.get(
        SERVER_URL + "/admin/user/info?userId=" + userId
      );
      setUserInfo(response.data);

      let response2 = await axios.get(
        SERVER_URL + "/user/payment?userId=" + userId
      );
      setPayment(response2.data);
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
          안녕하세요, {userInfo.info.userName} 님!
        </Text>
      </View>
      <Card
        style={{
          marginTop: 10,
          flex: 1.6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 10,
            paddingLeft: 20,
          }}
        >
          <MoneyIcon color={"#414251"} size={25} />
          <Text style={{ color: "gray", fontSize: 13, marginLeft: 6 }}>
            남은 한도 / 총 한도
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 35, color: "#414251", marginRight: 10 }}>
            {numberWithCommas(userInfo.info.balance)}
          </Text>
          <Text
            style={{
              fontSize: 24,
              color: "#414251",
            }}
          >
            원
          </Text>
        </View>

        <View
          style={{
            alignItems: "flex-end",
            paddingRight: 25,
            paddingBottom: 10,
          }}
        >
          <Text style={{ color: "#414251" }}>
            / {numberWithCommas(userInfo.info.cardLimit)} 원
          </Text>
        </View>
      </Card>
      <View
        style={{
          flex: 0.7,
          flexDirection: "row",
          alignItems: "flex-end",
          paddingBottom: "3%",
          paddingLeft: 8,
        }}
      >
        <PaymentHistoryIcon color={"#414251"} size="26" />
        <Text
          style={{
            fontSize: 24,
            marginLeft: 10,
            fontWeight: "bold",
            color: "#414251",
          }}
        >
          최근 이용 내역
        </Text>
      </View>
      <Card
        style={{
          marginBottom: "10%",
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
          <View style={{ flex: 1, alignItems: "stretch" }}>
            {payment.paymentList.content.map((payment, index) => (
              <View key={payment.paymentId}>
                {!match(payment.date) && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, color: "#414251" }}>
                        {+payment.date.substring(5, 7)}월{" "}
                        {+payment.date.substring(8, 10)}일
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 3,
                        borderBottomColor: "#A09E9E",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                    />
                  </View>
                )}
                <Payment
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

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: "#737373",
            paddingVertical: 10,
          }}
          onPress={() => {
            props.navigation.navigate("TopNavigator");
          }}
          activeOpacity={0.5}
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
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: "10%",
    backgroundColor: "white",
  },
  contents: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
  intro: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
