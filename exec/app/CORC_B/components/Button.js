import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from '../constants/Colors'

const Button = (props) => {
  const {title, onPress, backgroundColor, fontColor, style, fontStyle, ...others} = props

  let bColor = backgroundColor ? backgroundColor : Colors.primary.backgroundColor
  let fColor = fontColor ? fontColor : Colors.primary.fontColor

  return (
    <TouchableOpacity
      style={{...styles.button, ...style, backgroundColor: bColor}}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={{...styles.text, ...fontStyle, color: fColor}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    height: 45,
    borderWidth: 0,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical:3,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Button;
