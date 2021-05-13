import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Colors from '../constants/Colors';
import * as LocalAuthentication from 'expo-local-authentication';
import axios from 'axios';

export default function QRScan() {
  const SERVER_URL = 'http://192.168.219.102:8765/shinhan/';

  const userId = useSelector((state) => state.auth.userId);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentData, setPaymentData] = useState();

  //지문
  const [compatible, setCompatible] = useState(false);
  const [fingerprints, setFingerprints] = useState(false);
  const [result, setResult] = useState();

  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    setCompatible(compatible);
    console.log('compatible : ', compatible);
  };
  const checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    setFingerprints(fingerprints);
    console.log('fingerprints : ', fingerprints);
  };
  const scanFingerprint = async () => {
    if (!compatible) {
      if (!fingerprints) {
        return;
      }
    }
    let result = await LocalAuthentication.authenticateAsync(
      'Scan your finger.'
    );
    console.log('Scan Result:', result.success);

    setResult(result);
    if (result.success) {
      pay();
    }
  };
  //
  // var param = new FormData();
  const pay = async () => {
    console.log(paymentData.orderList);

    // console.log(userId);
    // console.log(paymentData.storeid);
    // param.append('total', +paymentData.total);
    // param.append('userId', +userId);
    // param.append('storeId', +paymentData.storeId);
    // console.log(param);

    // let response = await axios.post(
    //   `${SERVER_URL}user/pay?total=${+paymentData.total}&userId=${userId}&storeId=${
    //     paymentData.storeid
    //   }`,
    //   paymentData.orderList

    //   // json.parse(paymentData.orderList)
    //   // total: +paymentData.total,
    //   // userId: +userId,
    //   // storeId: +paymentData.storeid,
    // );
    // console.log('response : ', response);
  };

  useEffect(() => {
    checkDeviceForHardware();
    checkForFingerprints();
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModalVisible(true);
    // console.log(JSON.parse(data));
    const temp = JSON.parse(data);
    console.log(temp);
    setPaymentData(temp);
    // console.log('paymentData : ' + paymentData);
    console.log(temp.orderList);
    // console.log('몇번 호출되나');
    // alert(`${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        type={BarCodeScanner.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barCode}
      >
        <View style={styles.topView}>
          <Text style={styles.text}>QR 코드를 스캔하세요</Text>
        </View>
        <View style={styles.bottomView}>
          {scanned && (
            <Button
              color="#f194ff"
              title={'Tap to Scan Again'}
              onPress={() => setScanned(false)}
            />
          )}
          {scanned && ( // 모달
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <ScrollView
                    style={{
                      flex: 1,
                      padding: 35,
                    }}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.modalText}>
                        {paymentData.storeName}
                      </Text>
                      {paymentData.orderList.map((item, index) => (
                        <View
                          style={{ flexDirection: 'row', marginVertical: 5 }}
                        >
                          <View style={{ flex: 2 }}>
                            <Text>
                              {item.productName} x {item.amount}
                            </Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text>
                              ￦ {numberWithCommas(item.price * item.amount)}
                            </Text>
                          </View>
                        </View>
                      ))}
                      <View
                        style={{
                          // flex: 1,
                          borderBottomWidth: StyleSheet.hairlineWidth,
                          marginVertical: 15,
                        }}
                      />
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <View>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}
                          >
                            Total
                          </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}
                          >
                            ￦ {numberWithCommas(paymentData.total)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#414251', fontSize: 12 }}>
                      주문 내역이 맞는지 확인해주세요.
                    </Text>
                  </View>
                  <View style={{ justifyContent: 'center', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Pressable
                        style={[styles.payButton, styles.buttonPay]}
                        onPress={scanFingerprint}
                      >
                        <Text style={styles.payText}>결제 </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.closeButton, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.closeText}>취소</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                {/* <View style={{ flex: 1, backgroundColor: '#000' }}>
                  <Text>??</Text>
                </View> */}
              </View>
            </Modal>
          )}
        </View>
      </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  barCode: {
    flex: 1,
    width: '110%',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '60%',
  },

  // 모달 관련
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.50)',
  },
  modalView: {
    // flex: 1,
    width: '80%',
    height: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    // textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  payButton: {
    flex: 1,
    borderBottomLeftRadius: 20,
    padding: '5%',
    elevation: 2,
  },
  closeButton: {
    flex: 1,
    borderBottomRightRadius: 20,
    padding: '5%',
    elevation: 2,
  },
  buttonPay: {
    backgroundColor: Colors.primary.backgroundColor,
  },
  buttonClose: {
    backgroundColor: Colors.cancel.backgroundColor,
  },
  payText: {
    color: Colors.primary.fontColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  closeText: {
    color: Colors.cancel.fontColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
