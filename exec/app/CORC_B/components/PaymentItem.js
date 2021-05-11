import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Payment = (props) => {
  const { payment, formatMoney } = props;
  return (
    <View style={styles.container}>
      <View style={styles.itemNamePrice}>
        <Text style={styles.itemNameFont}>
          {payment.paymentitem[0].productName}
          {payment.paymentitem.length > 1 &&
            " 외 " + (payment.paymentitem.length - 1) + "건"}
        </Text>
        <Text style={styles.moneyFont}>{formatMoney(payment.total)}원</Text>
      </View>
      <Text style={styles.priceFont}>{payment.date.slice(11, 16)}</Text>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 6,
    paddingHorizontal: 4,
  },
  itemNamePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemNameFont: {
    fontSize: 16,
  },
  moneyFont: {
    fontWeight: "bold",
    fontSize: 16,
  },
  priceFont: {
    fontSize: 11.5,
    color: "gray",
  },
});
