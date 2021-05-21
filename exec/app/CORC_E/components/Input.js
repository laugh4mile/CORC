import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const Input = (props) => {
  const placeholder = props.placeholder ? props.placeholder : null;
  const [secure, setSecure] = useState(true);
  const type = props.type;
  const [focus, setFocus] = useState(false);
  const returnKeyType = props.returnKeyType ? props.returnKeyType : 'done';
  const keyboardType = props.keyboardType ? props.keyboardType : 'default';

  return (
    <View style={!focus ? styles.container : styles.containerFocused}>
      {type === 'password' ? (
        <>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secure}
            onChangeText={props.onChangeText}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
          />
          <TouchableOpacity
            onPress={() => {
              setSecure(!secure);
            }}
          >
            <Icon name={secure ? 'eye' : 'eye-off'} size={20} />
          </TouchableOpacity>
        </>
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={props.onChangeText}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 44,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  containerFocused: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 44,
    borderColor: '#979797',
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
