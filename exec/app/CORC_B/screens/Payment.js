import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import axios from "axios";

import Colors from "../constants/Colors";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import QRcodeScan from "./Payment/QRcodeScan";
import { SERVER_URL } from "../env";

const { width } = Dimensions.get("window");
const imgSize = width * 0.06;
const qrSize = width * 0.55;

const Payment = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const [storeName, setstoreName] = useState("");
  const [scanOpened, setScanOpened] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVacateModalVisible, setVacateModalVisible] = useState(false);
  const [items, setItems] = useState([]);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState(0);

  const [qrVisible, setQRVisible] = useState(false);

  const [isProductNameValid, setisProductNameValid] = useState(true);
  const [isPriceValid, setisPriceValid] = useState(true);
  const [isQuantityValid, setisQuantityValid] = useState(true);

  const productNameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();

  useEffect(() => {
    (async () => {
      let response = await axios.get(
        SERVER_URL + "/store/payment?storeId=" + userId
      );
      setstoreName(response.data.info.storeName);
    })();
  }, []);

  useEffect(() => {
    getSum();
  }, [items]);

  const getSum = () => {
    let sum = 0;
    for (let index = 0; index < items.length; index++) {
      sum += items[index].amount * items[index].price;
    }
    setTotal(sum);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const checkProductName = (text) => {
    setisProductNameValid(text.toString().trim().length > 0);
    setProductName(text.toString().trim());
  };

  const numExp = /^\d+$/; // number expression

  const checkPrice = (text) => {
    setisPriceValid(numExp.test(text.toString()) && text > 0);
    setPrice(text);
  };

  const checkQuantity = (text) => {
    setisQuantityValid(numExp.test(text.toString()) && text > 0);
    setQuantity(text);
  };

  const addItem = () => {
    var spExp = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi; // special character
    if (!isProductNameValid) {
      return Alert.alert(null, "이름을 확인해주세요.", [
        { text: "확인", onPress: () => productNameRef.current.focus() },
      ]);
    }
    if (!isPriceValid) {
      return Alert.alert(null, "가격을 확인해주세요.", [
        { text: "확인", onPress: () => priceRef.current.focus() },
      ]);
    }
    if (!isQuantityValid) {
      return Alert.alert(null, "수량을 확인해주세요.", [
        { text: "확인", onPress: () => quantityRef.current.focus() },
      ]);
    }

    setItems([
      ...items,
      {
        productName: productName,
        price: price,
        amount: quantity,
      },
    ]);

    setProductName("");
    setPrice("");
    setQuantity("");

    toggleModal();
  };

  const addScannedItem = (productName, price) => {
    setScanOpened(false);

    setItems([
      ...items,
      {
        productName: productName,
        price: price,
        amount: "1",
      },
    ]);
  };

  const cancelAddItem = () => {
    setProductName("");
    setPrice("");
    setQuantity("");
    toggleModal();
  };

  const reset = () => {
    setItems([]);
    setVacateModalVisible(false);
  };

  const removeItem = (index) => {
    if (index > -1) {
      var copied = items
        .slice(0, index)
        .concat(items.slice(index + 1, items.length));
    }
    setItems(copied);
  };

  const amountHander = (index, data) => {
    if (index > -1) {
      data = data.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
      var copied = items;
      copied[index].amount = data;
    }
    setItems(copied);
    getSum();
  };

  const createPayment = () => {
    if (!items || items.length <= 0) {
      return Alert.alert(
        null,
        "주문할 내역이 없습니다.\n주문 내역 추가 후, 다시 시도해 주세요."
      );
    }
    // var spExp = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi; // special character
    var numExp = /^\d+$/; // number expression
    for (let index = 0; index < items.length; index++) {
      let e = items[index];
      if (e.productName.trim().length <= 0) {
        return Alert.alert(
          null,
          `${index + 1}번째 품목의 이름을 다시 한 번 확인해주세요.`
        );
      }
      if (!numExp.test(e.price.toString()) || e.price <= 0) {
        return Alert.alert(
          null,
          `${index + 1}번째 품목의 가격을 다시 한 번 확인해주세요.`
        );
      }
      if (!numExp.test(e.amount.toString()) || e.amount <= 0) {
        return Alert.alert(
          null,
          `${index + 1}번째 품목의 수량을 다시 한 번 확인해주세요.`
        );
      }
    }
    setQRVisible(true);
  };

  const GenerateQR = (props) => {
    let size = props.size ? props.size : 100;
    let data = {
      storeid: userId,
      storeName: storeName,
      orderList: items,
      total: total,
    };

    return <QRCode value={JSON.stringify(data)} size={size} />;
  };

  const formatMoney = (number) =>
    number !== null && +number >= 0
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : null;

  return (
    <View style={styles.container}>
      <View style={styles.orderHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.orderHeaderText}>주문서</Text>
        </View>

        <FontAwesome.Button
          name="plus-square"
          onPress={() => toggleModal()}
          backgroundColor="white"
          color="#a5a5a8"
          size={imgSize}
          underlayColor="white"
          iconStyle={{ marginRight: 0 }}
          activeOpacity={0.6}
        />
        <FontAwesome.Button
          name="qrcode"
          onPress={() => setScanOpened(true)}
          backgroundColor="white"
          color={scanOpened ? "#7986FF" : "#a5a5a8"}
          size={imgSize}
          underlayColor="white"
          iconStyle={{ marginRight: 0 }}
        />
        <Modal isVisible={scanOpened}>
          <QRcodeScan
            onCancel={() => setScanOpened(false)}
            onScanned={(name, price) => addScannedItem(name, price)}
          />
        </Modal>
      </View>
      <Card style={styles.list}>
        <View style={styles.cardHeader}>
          <View style={{ flex: 3.5, alignItems: "center" }}>
            <Text style={styles.cardHeaderText}>품명</Text>
          </View>
          <View style={{ flex: 2.5, alignItems: "center" }}>
            <Text style={styles.cardHeaderText}>가격</Text>
          </View>
          <View style={{ flex: 1.5, alignItems: "center" }}>
            <Text style={styles.cardHeaderText}>수량</Text>
          </View>
          <View style={{}}>
            <FontAwesome.Button
              name="trash"
              onPress={() => setVacateModalVisible(true)}
              backgroundColor="white"
              color="#a5a5a8"
              underlayColor="white"
              activeOpacity={0.6}
              iconStyle={{}}
            />
            <Modal isVisible={isVacateModalVisible}>
              <Card style={{ ...styles.modalBox, height: "25%" }}>
                <View style={styles.vacateModalBody}>
                  <Text style={styles.vacateModalBodyText}>
                    정말로 비우시겠습니까?
                  </Text>
                </View>
                <View style={styles.vacateModalButtons}>
                  <View style={{ flex: 1 }}>
                    <Button
                      title="취소"
                      onPress={() => setVacateModalVisible(false)}
                      backgroundColor={Colors.cancel.backgroundColor}
                      fontColor={Colors.cancel.fontColor}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button title="확인" onPress={() => reset()} />
                  </View>
                </View>
              </Card>
            </Modal>
          </View>
        </View>
        <ScrollView style={styles.list}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <View style={styles.orderItemName}>
                  <Text style={styles.orderItemText}>{item.productName}</Text>
                </View>
                <View style={styles.orderItemPrice}>
                  <Text style={styles.orderItemText}>
                    {formatMoney(item.price)} 원
                  </Text>
                </View>
                <View style={styles.orderItemQuantity}>
                  <TextInput
                    style={{
                      ...styles.orderItemText,
                      borderBottomWidth: 1.3,
                    }}
                    onChangeText={(amount) => amountHander(index, amount)}
                    keyboardType="numeric"
                    defaultValue={item.amount}
                  />
                </View>
                <View>
                  <FontAwesome.Button
                    name="minus-square-o"
                    backgroundColor="white"
                    color="#a5a5a8"
                    underlayColor="white"
                    iconStyle={{ marginVertical: -8 }}
                    activeOpacity={0.6}
                    onPress={() => removeItem(index)}
                  />
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyList}>
              <Text style={{ color: "gray" }}>아이템을 추가해주세요.</Text>
            </View>
          )}
        </ScrollView>
      </Card>
      <View style={styles.orderPredict}>
        <View>
          <Text style={styles.orderHeaderText}>결제 예정 금액</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.orderHeaderText}>
            <Text style={{ fontSize: imgSize * 1.2 }}>
              {formatMoney(total)}
            </Text>{" "}
            원
          </Text>
        </View>
        <Button
          title="QR Code 생성하기"
          onPress={() => {
            createPayment();
          }}
        />
        <Modal isVisible={qrVisible} backdropOpacity={0.1}>
          <Card style={styles.qrCard}>
            <View style={styles.qrImage}>
              {qrVisible && <GenerateQR size={qrSize} />}
            </View>

            <View style={{ flex: 1.5, justifyContent: "space-evenly" }}>
              <Text style={styles.orderHeaderText}>주문서</Text>
              <Card
                style={{
                  ...styles.list,
                  marginHorizontal: "0%",
                  paddingRight: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 7,
                  }}
                >
                  <View style={styles.orderItemName}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      품명
                    </Text>
                  </View>
                  <View style={styles.orderItemPrice}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      가격
                    </Text>
                  </View>
                  <View style={styles.orderItemQuantity}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      수량
                    </Text>
                  </View>
                </View>
                <ScrollView style={styles.list}>
                  {items.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        marginVertical: 3,
                      }}
                    >
                      <View style={styles.orderItemName}>
                        <Text style={{ textAlign: "center", fontSize: 14 }}>
                          {item.productName}
                        </Text>
                      </View>
                      <View style={styles.orderItemPrice}>
                        <Text style={{ fontSize: 14 }}>
                          {formatMoney(item.price)} 원
                        </Text>
                      </View>
                      <View style={styles.orderItemQuantity}>
                        <Text style={{ fontSize: 14 }}>
                          {formatMoney(item.amount)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </Card>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "space-evenly",
                paddingTop: 7,
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: imgSize }}>
                  결제할 금액
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: imgSize }}>
                  <Text style={{ fontSize: imgSize * 1.2 }}>
                    {formatMoney(total)}
                  </Text>
                  {" 원"}
                </Text>
              </View>
              {/* <Button
                title="결제 완료"
                onPress={() => {
                  setQRVisible(false);
                  setItems([]);
                }}
              /> */}
              <View style={styles.footerItems}>
                <Text
                  onPress={() => {
                    // Alert.alert(null, "결제가 취소되었습니다.", [
                    //   {
                    //     text: "확인",
                    //     onPress: () => {
                    //       setQRVisible(false);
                    //     },
                    //   },
                    // ]);
                    setQRVisible(false);
                  }}
                  style={styles.textlink}
                >
                  닫기
                </Text>
              </View>
            </View>
          </Card>
        </Modal>
      </View>

      <Modal isVisible={isModalVisible}>
        <Card style={{ paddingTop: 10 }}>
          <Input
            style={{
              marginHorizontal: 10,
              borderColor: isProductNameValid ? "#dddddd" : "red",
            }}
            placeholder="이름"
            onChangeText={(name) => checkProductName(name)}
            returnKeyType="next"
            onSubmitEditing={() => {
              priceRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={productNameRef}
          />
          <Input
            style={{
              marginHorizontal: 10,
              borderColor: isPriceValid ? "#dddddd" : "red",
            }}
            placeholder="가격"
            onChangeText={(price) => checkPrice(price)}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => {
              quantityRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={priceRef}
          />
          <Input
            style={{
              marginHorizontal: 10,
              borderColor: isQuantityValid ? "#dddddd" : "red",
            }}
            placeholder="수량"
            onChangeText={(quantity) => checkQuantity(quantity)}
            keyboardType="numeric"
            onSubmitEditing={() => {
              addItem();
            }}
            ref={quantityRef}
          />
          <View style={styles.addModalButtons}>
            <Button
              title="취소"
              onPress={() => cancelAddItem()}
              backgroundColor={Colors.cancel.backgroundColor}
              fontColor={Colors.cancel.fontColor}
              style={{ flex: 1, borderRadius: 0, borderBottomStartRadius: 12 }}
            />
            <Button
              title="추가하기"
              onPress={() => addItem()}
              style={{ flex: 1, borderRadius: 0, borderBottomEndRadius: 12 }}
            />
          </View>
        </Card>
      </Modal>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  orderHeader: {
    flexDirection: "row",
    height: "10%",
    alignItems: "flex-end",
    paddingHorizontal: "10%",
    marginBottom: 10,
  },
  orderHeaderText: {
    fontWeight: "bold",
    fontSize: imgSize,
  },
  list: {
    marginBottom: 10,
    flex: 2,
    paddingHorizontal: 3,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderItemName: {
    flex: 3.5,
    alignItems: "center",
  },
  orderItemPrice: {
    flex: 2.5,
    alignItems: "center",
  },
  orderItemQuantity: {
    flex: 1.5,
    alignItems: "center",
  },
  orderItemText: {
    fontSize: 15,
    textAlign: "center",
  },
  emptyList: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  orderPredict: {
    flex: 1,
    paddingHorizontal: "10%",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    paddingHorizontal: 3,
  },
  cardHeaderText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  modalBox: {
    padding: 10,
  },
  vacateModalBody: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  vacateModalBodyText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  vacateModalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  footerItems: {
    alignItems: "center",
    marginTop: 5,
  },
  textlink: {
    textDecorationLine: "underline",
    textDecorationColor: "#696A6E",
    color: "#696A6E",
  },
  addModalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  qrCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 0,
    marginHorizontal: "0%",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
  },
  qrImage: {
    flex: 1.7,
    justifyContent: "center",
    alignItems: "center",
  },
});
