import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 0,
    // ios
    shadowColor: "#000000",
    shadowOpacity: 0.21,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    // android
    elevation: 10,
  },
});
