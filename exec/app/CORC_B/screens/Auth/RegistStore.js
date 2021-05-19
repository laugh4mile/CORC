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
import {
  MaterialCommunityIcons as Icon,
  FontAwesome,
} from "@expo/vector-icons";

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

  const emailReg =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const [isEmailVaild, setisEmailVaild] = useState(false);
  const [isEmailUsable, setisEmailUsable] = useState(false);

  const [isCrNumValid, setisCrNumVaild] = useState(false);

  useEffect(() => {
    getSido();
  }, []);

  useEffect(() => {
    getGugun();
  }, [sidoCode]);

  useEffect(() => {
    setisCrNumVaild(true);
    if (!checkCrNumValid(crNum)) {
      setisCrNumVaild(false);
    }
  }, [crNum]);

  useEffect(() => {
    setisEmailVaild(true);

    if (!checkEmailValid(email)) {
      setisEmailVaild(false);
    }

    // when email usable by double-check, if email changed, set usable false
    if (isEmailUsable) {
      setisEmailUsable(false);
    }
  }, [email]);

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
    if (!isCrNumValid) {
      return Alert.alert(
        null,
        "사업자 등록번호가 유효하지 않습니다.\n확인해 주세요.",
        [{ text: "확인", onPress: () => crNumRef.current.focus() }]
      );
    }
    if (!storeName) {
      return Alert.alert(null, "가맹점명을 입력해 주세요.", [
        { text: "확인", onPress: () => storeNameRef.current.focus() },
      ]);
    }
    if (!categoryCode || categoryCode.toString().trim().length !== 5) {
      return Alert.alert(null, "업종코드를 확인해 주세요.", [
        { text: "확인", onPress: () => categoryCodeRef.current.focus() },
      ]);
    }
    if (!sidoCode || sidoCode === "선택") {
      return Alert.alert(null, "시/도를 선택해 주세요.", [{ text: "확인" }]);
    }
    if (!gugunCode || gugunCode === "선택") {
      return Alert.alert(null, "구/군을 선택해 주세요.", [{ text: "확인" }]);
    }
    if (!email) {
      return Alert.alert(null, "이메일을 입력해 주세요.", [
        { text: "확인", onPress: () => emailRef.current.focus() },
      ]);
    }
    if (!isEmailUsable) {
      return Alert.alert(null, "이메일 중복여부를 확인해 주세요.", [
        { text: "확인" },
      ]);
    }
    if (!password || password.trim().length < 6) {
      return Alert.alert(
        null,
        "비밀번호가 너무 짧습니다.\n다시 입력해 주세요.",
        [{ text: "확인", onPress: () => passwordRef.current.focus() }]
      );
    }
    if (!bankName || bankName.trim().length < 1) {
      return Alert.alert(null, "은행명을 입력해 주세요.", [
        { text: "확인", onPress: () => bankNameRef.current.focus() },
      ]);
    }
    if (
      !account ||
      account.trim().length < 1 ||
      isNaN(+account.replace(/-/gi, ""))
    ) {
      return Alert.alert(null, "계좌번호를 입력해 주세요.", [
        { text: "확인", onPress: () => accountRef.current.focus() },
      ]);
    }
    if (!contact || contact.trim().length < 1) {
      return Alert.alert(null, "연락처를 입력해 주세요.", [
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
      account: +account.replace(/-/gi, ""),
      sidoCode: sidoCode,
      gugunCode: gugunCode,
    };

    let action = authActions.registStore(data);
    seterror(null);
    try {
      await dispatch(action);
      return Alert.alert(null, "신청이 완료되었습니다.", [
        { text: "확인", onPress: () => props.navigation.goBack() },
      ]);
    } catch (e) {
      seterror(e.message);
    }
  };

  const checkEmailValid = (email) => {
    if (!email) {
      return false;
    }
    if (!emailReg.test(email)) {
      return false;
    }
    return true;
  };

  // email input handler
  const emailHandler = (text) => {
    setEmail(text);
  };

  // email double check button handler
  const emailDoubleCheckHandler = async () => {
    if (!isEmailVaild) {
      return Alert.alert(null, "이메일을 확인해 주세요.", [
        { text: "확인", onPress: () => emailRef.current.focus() },
      ]);
    }

    let action = authActions.checkEmail(email.trim());
    let existed = await dispatch(action);

    if (existed) {
      return Alert.alert(null, "이미 사용중인 이메일입니다.", [
        {
          text: "확인",
          onPress: () => {
            setisEmailUsable(false);
            emailRef.current.focus();
          },
        },
      ]);
    }

    Alert.alert(null, "사용 가능한 이메일입니다.", [
      {
        text: "취소",
        onPress: () => {
          setisEmailUsable(false);
          emailRef.current.focus();
        },
      },
      {
        text: "사용",
        onPress: () => {
          setisEmailUsable(true);
          passwordRef.current.focus();
        },
      },
    ]);
  };

  // crnum input handler
  const crNumHandler = (crNum) => {
    setCrNum(crNum);
  };

  // return crnum is valid
  const checkCrNumValid = (crNum) => {
    if (crNum === "" || crNum.toString().length !== 12) {
      return false;
    }
    if ((crNum = (crNum + "").match(/\d{1}/g)).length != 10) {
      return false;
    }

    var sum = 0,
      key = [1, 3, 7, 1, 3, 7, 1, 3, 5];

    for (var i = 0; i < 9; i++) {
      sum += key[i] * Number(crNum[i]);
    }

    return (
      10 - ((sum + Math.floor((key[8] * Number(crNum[8])) / 10)) % 10) ==
      Number(crNum[9])
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ScrollView style={{ paddingHorizontal: "10%" }}>
          <Text style={styles.inputLabel}>사업자 등록번호</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Input
              style={
                !crNum
                  ? { flex: 1 }
                  : isCrNumValid
                  ? { flex: 1 }
                  : { flex: 1, borderColor: "red" }
              }
              maxLength={12}
              placeholder="123-45-67891"
              onChangeText={(text) => crNumHandler(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                storeNameRef.current.focus();
              }}
              blurOnSubmit={false}
              ref={crNumRef}
            />
          </View>
          <Text style={styles.inputLabel}>가맹점명</Text>
          <Input
            maxLength={45}
            placeholder="가맹점명"
            onChangeText={(text) => setStoreName(text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              categoryCodeRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={storeNameRef}
          />
          <Text style={styles.inputLabel}>업종코드</Text>
          <Input
            maxLength={5}
            placeholder={
              "표준산업분류(5자리 숫자, 세세분류) 코드를\n입력해 주세요."
            }
            onChangeText={(text) => setCategoryCode(text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={categoryCodeRef}
          />
          <Text style={styles.inputLabel}>주소지</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}
          >
            <View style={{ ...styles.pickerView, marginRight: 5 }}>
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
              style={
                !email
                  ? { flex: 1 }
                  : isEmailVaild
                  ? { flex: 1 }
                  : { flex: 1, borderColor: "red" }
              }
              maxLength={45}
              placeholder="example@example.com"
              keyboardType="email-address"
              onChangeText={(text) => emailHandler(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              blurOnSubmit={false}
              ref={emailRef}
            >
              {isEmailUsable && (
                <Icon name={"check"} color={"green"} size={imgSize} />
              )}
            </Input>
            {/* <FontAwesome.Button
              name="search"
              onPress={() => {
                emailDoubleCheckHandler();
              }}
              backgroundColor="white"
              color="#a5a5a8"
              size={imgSize}
              underlayColor="white"
              iconStyle={{ marginRight: 0 }}
              activeOpacity={0.6}
            /> */}
            <View>
              <Button
                title="중복확인"
                onPress={() => {
                  emailDoubleCheckHandler();
                }}
                style={{ paddingHorizontal: 10, marginLeft: 5 }}
                fontStyle={{ fontSize: 13 }}
              />
            </View>
          </View>
          <Text style={styles.inputLabel}>비밀번호</Text>
          <Input
            maxLength={16}
            placeholder="비밀번호"
            returnKeyType="next"
            type="password"
            onChangeText={(text) => setPassword(text)}
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
            onChangeText={(text) => setbankName(text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              accountRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={bankNameRef}
          />
          <Text style={styles.inputLabel}>계좌번호</Text>
          <Input
            maxLength={9}
            keyboardType="numeric"
            placeholder="계좌번호"
            onChangeText={(text) => setaccount(text)}
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
    paddingHorizontal: "10%",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "10%",
  },
});
