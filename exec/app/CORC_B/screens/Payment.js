import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import Modal from "react-native-modal";
import BarcodeScan from "./Payment/BarcodeScan";

import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";

const Payment = (props) => {
  const [scanOpened, setScanOpened] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const addItem = () => {
    var spExp = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi; // special character
    var numExp = /^\d+$/; // number expression
    // const numExp = /^[0-9]*$/
    if (spExp.test(productName) || productName.toString().trim().length <= 0) {
      return Alert.alert(null, "이름을 확인해주세요.");
    }
    if (!numExp.test(price.toString()) || price <= 0) {
      return Alert.alert(null, "가격을 확인해주세요.");
    }
    if (!numExp.test(quantity.toString()) || quantity <= 0) {
      return Alert.alert(null, "수량을 확인해주세요.");
    }

    let total = quantity * price;
    setItems([
      ...items,
      { name: productName, price: price, quantity: quantity, total: total },
    ]);
    toggleModal();
  };
  const cancelAddItem = () => {
    setProductName("");
    setPrice(0);
    setQuantity(0);
    toggleModal();
  };
  const reset = () => {
    setItems([]);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button title="아이템 추가" onPress={() => toggleModal()} />
        {scanOpened ? (
          <Button title="스캐너 끄기" onPress={() => setScanOpened(false)} />
        ) : (
          <Button title="스캐너 켜기" onPress={() => setScanOpened(true)} />
        )}
        <Button title="비우기" onPress={() => reset()} color="#bbbbbb" />
      </View>
      <ScrollView style={styles.list}>
        {items.length > 0 ? (
          items.map((item, index) => {
            // console.log(item);
            return (
              <Text key={index}>
                {item.name} : {item.price} : {item.quantity} 총합: {item.total}
              </Text>
            );
          })
        ) : (
          <Text>아이템을 추가해주세요.</Text>
        )}
      </ScrollView>
      {scanOpened && (
        <View style={styles.scanbox}>
          <BarcodeScan />
        </View>
      )}

      <Modal isVisible={isModalVisible}>
        <Card style={styles.modalBox}>
          <Input
            placeholder="이름"
            onChangeText={(name) => setProductName(name)}
          />
          <Input
            placeholder="가격"
            onChangeText={(price) => setPrice(price)}
            keyboardType="numeric"
          />
          <Input
            placeholder="수량"
            onChangeText={(quantity) => setQuantity(quantity)}
            keyboardType="numeric"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Button title="추가하기" onPress={() => addItem()} />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="취소"
                onPress={() => cancelAddItem()}
                backgroundColor={Colors.cancel.backgroundColor}
                fontColor={Colors.cancel.fontColor}
              />
            </View>
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
    // justifyContent: 'space-evenly',
    // alignItems: 'center'
  },
  list: {
    // flex: 2,
    height: "70%",
  },
  scanbox: {
    height: "20%",
  },
  modalBox: {
    padding: 10,
  },
});
