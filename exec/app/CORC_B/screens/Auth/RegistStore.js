import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";

import Button from "../../components/Button";
import Input from "../../components/Input";
import * as authActions from "../../store/actions/auth";

const { width } = Dimensions.get("window");
const imgSize = width * 0.06;

const RegistStore = (props) => {
  const [crNum, setCrNum] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [contact, setcontact] = useState("");
  const [bankName, setbankName] = useState("");
  const [account, setaccount] = useState("");
  const [sidoCode, setsidoCode] = useState("");
  const [gugunCode, setgugunCode] = useState("");

  const [sidoList, setsidoList] = useState([
    { sidoCode: "선택", sidoName: "시/도" },
  ]);
  const [gugunList, setgugunList] = useState([
    { gugunCode: "선택", gugunName: "구/군" },
  ]);

  const [error, seterror] = useState();

  const crNumRef = useRef();
  const storeNameRef = useRef();
  const categoryCodeRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const bankNameRef = useRef();
  const accountRef = useRef();
  const contactRef = useRef();

  const emailReg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const [isEmailVaild, setisEmailVaild] = useState(false);
  const [checkEmailColor, setcheckEmailColor] = useState("#a5a5a8");

  useEffect(() => {
    getSido();
  }, []);

  useEffect(() => {
    getGugun();
  }, [sidoCode]);

  useEffect(() => {
    let mounted = true;
    if (error) {
      Alert.alert("가맹점 등록 실패", error, [{ text: "확인" }]);
    }

    return () => (mounted = false);
  }, [error]);

  const dispatch = useDispatch();

  const getSido = async () => {
    let result = await dispatch(authActions.getSidoList());
    setsidoList([{ sidoCode: "선택", sidoName: "시/도" }, ...result]);
  };

  const getGugun = async () => {
    if (
      sidoCode === null ||
      sidoCode === undefined ||
      !sidoCode ||
      sidoCode === "선택"
    ) {
      setgugunList([{ gugunCode: "선택", gugunName: "구/군" }]);
    } else {
      let result = await dispatch(authActions.getGugunList(sidoCode));
      setgugunList([{ gugunCode: "선택", gugunName: "구/군" }, ...result]);
    }
  };

  const applyFor = async () => {
    if (!crNum) {
      return Alert.alert(null, "사업자 등록번호를 입력해 주세요.", [
        { text: "확인", onPress: () => crNumRef.current.focus() },
      ]);
    }
    if (!storeName) {
      return Alert.alert(null, "가맹점명을 입력해 주세요.", [
        { text: "확인", onPress: () => storeNameRef.current.focus() },
      ]);
    }
    if (!categoryCode || categoryCode.toString().trim().length < 5) {
      return Alert.alert(null, "업종코드를 확인해 주세요.", [
        { text: "확인", onPress: () => categoryCodeRef.current.focus() },
      ]);
    }
    if (!sidoCode || sidoCode === "선택") {
      return Alert.alert(null, "시/도를 선택해 주세요!", [{ text: "확인" }]);
    }
    if (!gugunCode || gugunCode === "선택") {
      return Alert.alert(null, "구/군을 선택해 주세요!", [{ text: "확인" }]);
    }
    if (!email) {
      return Alert.alert(null, "이메일을 입력해 주세요!", [
        { text: "확인", onPress: () => emailRef.current.focus() },
      ]);
    }
    if (!isEmailVaild) {
      return Alert.alert(null, "이메일 중복 확인을 해 주세요!", [
        { text: "확인" },
      ]);
    }
    if (!password) {
      return Alert.alert(null, "비밀번호를 입력해 주세요!", [
        { text: "확인", onPress: () => passwordRef.current.focus() },
      ]);
    }
    if (!bankName) {
      return Alert.alert(null, "은행명을 입력해 주세요!", [
        { text: "확인", onPress: () => bankNameRef.current.focus() },
      ]);
    }
    if (!account) {
      return Alert.alert(null, "계좌번호를 입력해 주세요!", [
        { text: "확인", onPress: () => accountRef.current.focus() },
      ]);
    }
    if (!contact) {
      return Alert.alert(null, "연락처를 입력해 주세요!", [
        { text: "확인", onPress: () => contactRef.current.focus() },
      ]);
    }

    const data = {
      crNum: crNum,
      categoryCode: categoryCode,
      email: email,
      password: password,
      storeName: storeName,
      contact: contact,
      bankName: bankName,
      account: account,
      sidoCode: sidoCode,
      gugunCode: gugunCode,
    };

    let action = authActions.registStore(data);
    seterror(null);
    try {
      await dispatch(action);
      return Alert.alert(null, message, [
        { text: "확인", onPress: () => props.navigation.goBack() },
      ]);
    } catch (e) {
      seterror(e.message);
    }
  };

  const checkEmail = async () => {
    if (!email) {
      setisEmailVaild(false)
      setcheckEmailColor("red");
      return Alert.alert(null, "이메일을 입력해 주세요!", [
        { text: "확인", onPress: () => emailRef.current.focus() },
      ]);
    }
    if (!emailReg.test(email)) {
      setisEmailVaild(false)
      setcheckEmailColor("red");
      return Alert.alert(null, "이메일 형식에 맞춰주세요!", [
        { text: "확인", onPress: () => emailRef.current.focus() },
      ]);
    }

    let action = authActions.checkEmail(email);
    let existed = await dispatch(action);
    // console.log(typeof existed);
    changeEmail(existed)
  };

  const changeEmail = (bool) => {
    setisEmailVaild(!bool);
    setcheckEmailColor(bool ? "red" : "green")
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}> */}
      {/* <View style={styles.headerView}>
          <Text style={styles.headerText}>가맹점 신청</Text>
        </View> */}
      {/* </View> */}
      <View style={styles.form}>
        <ScrollView style={{ flex: 6 }}>
          <Text style={styles.inputLabel}>사업자 등록번호</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Input
              style={{ flex: 1 }}
              maxLength={12}
              placeholder="사업자 등록번호"
              onChangeText={(text) => {
                setCrNum(text);
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                storeNameRef.current.focus();
              }}
              blurOnSubmit={false}
              ref={crNumRef}
            />
            <FontAwesome.Button
              name="search"
              onPress={() => {
                Alert.alert(null, "검색버튼", [{ text: "확인" }]);
              }}
              backgroundColor="white"
              color="#a5a5a8"
              size={imgSize}
              underlayColor="white"
              iconStyle={{ marginRight: 0 }}
              activeOpacity={0.6}
            />
          </View>
          <Text style={styles.inputLabel}>가맹점명</Text>
          <Input
            maxLength={45}
            placeholder="가맹점명"
            onChangeText={(text) => {
              setStoreName(text);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              categoryCodeRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={storeNameRef}
          />
          <Text style={styles.inputLabel}>업종코드</Text>
          {/* Picker */}
          <Input
            maxLength={5}
            placeholder="세세분류(5자리 숫자)의 코드를 입력해 주세요."
            onChangeText={(text) => {
              setCategoryCode(text);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={categoryCodeRef}
          />
          <Text style={styles.inputLabel}>주소지</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.pickerView}>
              <Picker
                selectedValue={sidoCode}
                onValueChange={(value, index) => setsidoCode(value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {sidoList ? (
                  sidoList.map((item, index) => (
                    <Picker.Item
                      label={item.sidoName}
                      value={item.sidoCode}
                      key={index}
                    />
                  ))
                ) : (
                  <Picker.Item label="시/도" value="선택" />
                )}
              </Picker>
            </View>
            <View style={styles.pickerView}>
              <Picker
                selectedValue={gugunCode}
                onValueChange={(value, index) => setgugunCode(value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {gugunList ? (
                  gugunList.map((item, index) => (
                    <Picker.Item
                      label={item.gugunName}
                      value={item.gugunCode}
                      key={index}
                    />
                  ))
                ) : (
                  <Picker.Item label="구/군" value="선택" />
                )}
              </Picker>
            </View>
          </View>
          <Text style={styles.inputLabel}>이메일</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Input
              style={{ flex: 1 }}
              maxLength={45}
              placeholder="이메일"
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
                if (isEmailVaild) changeEmail(true);
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                checkEmail();
                passwordRef.current.focus();
              }}
              blurOnSubmit={false}
              ref={emailRef}
            />
            <FontAwesome.Button
              name="check"
              onPress={() => checkEmail()}
              backgroundColor="white"
              color={checkEmailColor}
              size={imgSize}
              underlayColor="white"
              iconStyle={{ marginRight: 0 }}
              activeOpacity={0.6}
            />
          </View>
          <Text style={styles.inputLabel}>비밀번호</Text>
          <Input
            maxLength={16}
            placeholder="비밀번호"
            returnKeyType="next"
            type="password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              bankNameRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={passwordRef}
          />
          <Text style={styles.inputLabel}>은행명</Text>
          <Input
            maxLength={45}
            placeholder="은행명"
            onChangeText={(text) => {
              setbankName(text);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              accountRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={bankNameRef}
          />
          <Text style={styles.inputLabel}>계좌번호</Text>
          <Input
            keyboardType="numeric"
            placeholder="계좌번호"
            onChangeText={(text) => {
              setaccount(text);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              contactRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={accountRef}
          />
          <Text style={styles.inputLabel}>연락처</Text>
          <Input
            maxLength={14}
            placeholder="연락처"
            keyboardType="numeric"
            onChangeText={(text) => {
              setcontact(text);
            }}
            onSubmitEditing={() => {
              applyFor();
            }}
            ref={contactRef}
          />
        </ScrollView>
      </View>
      <Text style={styles.reqText}>* 모든 항목은 필수 항목입니다.</Text>
      <View style={styles.footer}>
        {/* <View style={styles.reqView}> */}
        {/* </View> */}
        <Button title="신청" onPress={() => applyFor()} />
      </View>
    </View>
  );
};

export default RegistStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: "10%",
  },
  header: {
    flex: 1,
    marginTop: 10,
  },
  headerView: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  form: {
    flex: 6,
    marginBottom: 10,
  },
  inputLabel: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 12,
  },
  pickerView: {
    flex: 1,
    borderRadius: 12,
    borderColor: "#dddddd",
    borderWidth: 1,
  },
  picker: {
    height: 44,
  },
  pickerItem: {
    height: 44,
  },
  reqText: {
    fontSize: 11,
    color: "red",
    fontWeight: "bold",
    textAlign: "left",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
  },
});
