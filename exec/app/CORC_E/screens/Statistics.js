import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import axios from "axios";
import Colors from "../constants/Colors";
import SERVER_URL from "../env";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const pieWidth = screenWidth * 0.9;
const pieHeight = screenHeight * 0.23;

const pastelColor = [
  "FF8B8C",
  "FDB18B",
  "FFE08E",
  "FFFE8E",
  "FDB18B",
  "E3FF9E",
  "8DD0BC",
  "8DC3C6",
  "A3C8FB",
  "FF8B8C",
  "ADB8F1",
  "B597E1",
  "D292E0",
  "EC8EDF",
  "F48DB0",
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(256, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const sort = (array, keyName, subName) => {
  let copied = JSON.parse(JSON.stringify(array));

  return copied.sort((a, b) => {
    if (a[keyName] < b[keyName]) {
      return 1;
    }
    if (a[keyName] > b[keyName]) {
      return -1;
    }
    if (a[keyName] == b[keyName]) {
      if (subName && a[subName]) {
        if (a[subName] < b[subName]) {
          return 1;
        }
        if (a[subName] > b[subName]) {
          return -1;
        }
        return 0;
      }
      return 0;
    }
  });
};

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

const formatMoney = (number) =>
  number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;

const Statistics = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [isLoading, setIsLoading] = useState(true);
  const [itemList, setitemList] = useState([]);
  const [total, settotal] = useState(0);
  const [startDate, setstartDate] = useState(7);
  const [storeList, setStoreList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  var searchDateList = [
    { label: "일간", value: 1 },
    { label: "주간", value: 7 },
    { label: "월간", value: 30 },
  ];

  useEffect(() => {
    makeChart();
  }, [startDate]);
  const cutText = (text) => {
    if (text.length > 5) {
      const result = text.substring(0, 5) + "...";
      return result;
    }
    return text;
  };
  const makeChart = async () => {
    setIsLoading(true);
    var response = await axios.get(
      `${SERVER_URL}/user/payment/custom?userId=${userId}&forStatistics=true&startDate=${dateStrToNum(
        dateFrom(startDate)
      )}&endDate=${dateStrToNum(new Date())}`
    );
    setitemList([]);
    var payments;
    var copiedItemList = [];
    var totalSum = 0;
    var stores = [];
    var categories = [];

    if (response.data !== undefined && !response.data.paymentList.empty) {
      payments = response.data.paymentList.content;

      for (let i = 0; i < payments.length; i++) {
        const items = payments[i].paymentitem;
        totalSum += payments[i].total;
        for (let j = 0; j < items.length; j++) {
          var isContained = false;
          const item = items[j];
          for (let k = 0; k < copiedItemList.length; k++) {
            if (copiedItemList[k].name == item.productName) {
              copiedItemList[k].amount += item.amount;
              copiedItemList[k].priceSum += item.amount * item.price;
              isContained = true;
              break;
            }
          }
          if (!isContained) {
            copiedItemList.push({
              name: item.productName,
              amount: item.amount,
              priceSum: item.amount * item.price,
              legendFontColor: "#050505",
              legendFontSize: 16,
            });
          }
        }

        // 매장별 금액 통계
        var isContained2 = false;
        const item2 = payments[i].store;
        for (let k = 0; k < stores.length; k++) {
          if (stores[k].name == cutText(item2.storeName)) {
            stores[k].amount += 1;
            stores[k].priceSum += payments[i].total;
            isContained2 = true;
            break;
          }
        }
        if (!isContained2) {
          stores.push({
            name: cutText(item2.storeName),
            amount: 1,
            priceSum: payments[i].total,
            legendFontColor: "#050505",
            legendFontSize: 16,
          });
        }

        // 카테고리별 금액 통계
        var isContained3 = false;
        // const item3 = payments[i].store;
        for (let k = 0; k < categories.length; k++) {
          if (categories[k].name == cutText(item2.category.categoryName)) {
            categories[k].amount += 1;
            categories[k].priceSum += payments[i].total;
            isContained3 = true;
            break;
          }
        }
        if (!isContained3) {
          categories.push({
            name: cutText(item2.category.categoryName),
            amount: 1,
            priceSum: payments[i].total,
            legendFontColor: "#050505",
            legendFontSize: 16,
          });
        }
      }

      for (let index = 0; index < copiedItemList.length; index++) {
        copiedItemList[index].color =
          "#" +
          Math.round(
            ((index + 1) * 0xffffff) / (copiedItemList.length + 2)
          ).toString(16);
      }
      for (let index = 0; index < stores.length; index++) {
        stores[index].color = "#" + pastelColor[index % pastelColor.length];
      }
      for (let index = 0; index < categories.length; index++) {
        categories[index].color = "#" + pastelColor[index % pastelColor.length];
      }
    }
    setStoreList(sort(stores, "priceSum", "amount"));
    setitemList(sort(copiedItemList, "amount", "priceSum"));
    setCategoryList(sort(categories, "priceSum", "amount"));
    settotal(totalSum);

    setIsLoading(false);
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
      <View style={styles.header}>
        <View style={styles.headerDateView}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headerDateText}>
              {formatDate(dateFrom(startDate), "start")}
            </Text>
            <Text style={styles.headerDateText}>
              {formatDate(new Date(), "end")}
            </Text>
          </View>
        </View>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={startDate}
            onValueChange={(value, index) => setstartDate(value)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {searchDateList.map((item, index) => (
              <Picker.Item label={item.label} value={item.value} key={index} />
            ))}
          </Picker>
        </View>
      </View>
      {itemList.length > 0 ? (
        <>
          <View style={styles.pieChart}>
            <PieChart
              style={{ marginTop: "10%" }}
              data={categoryList}
              width={pieWidth}
              height={pieHeight}
              chartConfig={chartConfig}
              accessor={"priceSum"}
              backgroundColor={"transparent"}
              center={[10, 0]}
              absolute
            />
            <Text style={styles.basisText}>[카테고리 기준]</Text>
            <PieChart
              style={{ marginTop: "10%" }}
              data={storeList}
              width={pieWidth}
              height={pieHeight}
              chartConfig={chartConfig}
              accessor={"priceSum"}
              backgroundColor={"transparent"}
              center={[10, 0]}
              absolute
            />
            <Text style={styles.basisText}>[지출량 기준]</Text>
          </View>
          <View style={styles.totalView}>
            <Text style={styles.totalText}>
              <Text style={styles.totalMoneyText}>{formatMoney(total)}</Text> 원
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.noContent}>
          <Text style={styles.noContentText}>판매 내역이 없습니다.</Text>
        </View>
      )}
    </View>
  );
};

export default Statistics;

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
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: "5%",
    marginTop: "7%",
  },
  headerDateView: {
    flex: 1,
    paddingLeft: "10%",
  },
  headerDateText: {
    fontSize: 15,
  },
  pickerView: {
    justifyContent: "center",
    backgroundColor: "white",
    width: "30%",
    borderRadius: 12,
    borderColor: "#ddd",
    borderWidth: 0,
    // ios
    shadowColor: "#000000",
    shadowOpacity: 0.21,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    // android
    elevation: 15,
  },
  picker: {
    height: 34,
  },
  pickerItem: {},
  pieChart: {
    flex: 8,
    alignItems: "center",
    marginBottom: "30%",
  },
  basisText: {
    fontSize: 14,
    fontWeight: "900",
  },
  totalView: {
    flex: 1,
    marginBottom: "3%",
    marginRight: "7%",
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 30,
  },
  totalMoneyText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  noContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noContentText: {
    fontSize: 17,
    fontWeight: "800",
  },
});
