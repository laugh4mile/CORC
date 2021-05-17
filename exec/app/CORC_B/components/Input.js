import React, { useState, forwardRef } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const Input = forwardRef((props, ref) => {
  const [secure, setSecure] = useState(true);
  const [focus, setFocus] = useState(false);

  const { style: cStyle, ...others } = props;
  const { children, ...otherProps } = others;

  return (
    <View style={[!focus ? styles.container : styles.containerFocused, cStyle]}>
      {props.type && props.type === "password" ? (
        <>
          <TextInput
            {...others}
            style={styles.input}
            secureTextEntry={secure}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            ref={ref ? ref : null}
          />
          <TouchableOpacity
            onPress={() => {
              setSecure(!secure);
            }}
          >
            <Icon name={secure ? "eye" : "eye-off"} size={20} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            {...otherProps}
            style={styles.input}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            ref={ref ? ref : null}
          />
          {children}
        </>
      )}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    height: 44,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  containerFocused: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    height: 44,
    borderColor: "#979797",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 44,
    flex: 1,
  },
});
