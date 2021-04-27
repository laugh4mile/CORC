import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    backgroundColor: "#0478C5",
    borderColor: 0,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: '10%',
    alignSelf: "stretch",
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    color: 'white',
    fontWeight: "bold",
  },
});

export default CustomButton;
