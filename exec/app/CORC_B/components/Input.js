import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const Input = ({placeholder, type, returnKeyType, keyboardType, onChangeText}) => {
  const [secure, setSecure] = useState(true);
  const [focus, setFocus] = useState(false);
  const placeholderV = placeholder ? placeholder : null;
  const returnKeyTypeV = returnKeyType ? returnKeyType : "done"
  const keyboardTypeV = keyboardType ? keyboardType : "default"

  return (
    <View style={!focus ? styles.container : styles.containerFocused}>
      {type === "password" ? (
        <>
          <TextInput
            style={styles.input}
            placeholder={placeholderV}
            secureTextEntry={secure}
            onChangeText={onChangeText}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            returnKeyType={returnKeyTypeV}
            keyboardType={keyboardTypeV}
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
        <TextInput
          style={styles.input}
          placeholder={placeholderV}
          onChangeText={onChangeText}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          returnKeyType={returnKeyTypeV}
          keyboardType={keyboardTypeV}
        />
      )}
    </View>
  );
};

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
