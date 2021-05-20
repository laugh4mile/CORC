import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image, Alert, Modal } from "react-native";
import { useDispatch } from 'react-redux';

import Button from "../../components/Button";
import Input from "../../components/Input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const logo = require("../../assets/login_logo.png");

const LoginScreen = (props) => {
  const [error, setError] = useState();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const userIdRef = useRef();
  const passwordRef = useRef();
  
  const dispatch = useDispatch()

  useEffect(() => {
    let mounted = true;
    if (error) {
      Alert.alert("로그인 실패", error, [{ text: "확인" }]);
    }

    return () => (mounted = false)
  }, [error]);

  const idCheckHandler = (userid) => {
    if (userid.trim().length === 0) {
      setIdValid(false);
    } else {
      setIdValid(true);
    }
    setUserId(userid);
  };

  const passwordCheckHandler = (password) => {
    if (password.trim().length === 0) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
    setPassword(password);
  };

  const login = async () => {
    if (!idValid) {
      return Alert.alert(null, "아이디를 입력해 주세요.");
    }
    if (!passwordValid) {
      return Alert.alert(null, "비밀번호를 입력해 주세요.");
    }

    let action = authActions.login(userId.trim(), password.trim());
    setError(null);
    try {
      await dispatch(action);
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={styles.section}>
        <Input
          placeholder="아이디"
          style={styles.input}
          onChangeText={(userId) => {
            idCheckHandler(userId);
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          keyboardType="email-address"
          blurOnSubmit={false}
          ref={userIdRef}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          onChangeText={(password) => {
            passwordCheckHandler(password);
          }}
          onSubmitEditing={() => {
            login()
          }}
          ref={passwordRef}
        />
      </View>
      <View style={styles.footer}>
        <Button
          title="로그인"
          onPress={login}
          backgroundColor={Colors.primary.backgroundColor}
          fontColor={Colors.primary.fontColor}
        />
        <View style={styles.footerItems}>
          <Text
            onPress={() => props.navigation.navigate("RegistStore")}
            style={styles.textlink}
          >
            가맹점 신청
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: "10%",
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  section: {
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    paddingTop: "10%",
    flex: 2,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 44,
  },
  image: {
    width: 156,
    height: 156,
    resizeMode: "contain",
  },
  footerItems: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: "10%",
  },
  textlink: {
    textDecorationLine: "underline",
    textDecorationColor: "#696A6E",
    color: "#696A6E",
  },
});
