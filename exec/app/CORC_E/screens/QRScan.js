import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Colors from '../constants/Colors';
import * as LocalAuthentication from 'expo-local-authentication';
import axios from 'axios';
import SERVER_URL from '../env';

const QRScan = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [message, setMessage] = useState();
  const [paymentData, setPaymentData] = useState();

  //지문
  const [compatible, setCompatible] = useState(false);
  const [fingerprints, setFingerprints] = useState(false);
  const [result, setResult] = useState();

  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    setCompatible(compatible);
  };
  const checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    setFingerprints(fingerprints);
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

    setResult(result);
    if (result.success) {
      pay();
    }
  };
  //
  const pay = async () => {
    try {
      let response = await axios.post(
        `${SERVER_URL}/user/pay?total=${+paymentData.total}&userId=${userId}&storeId=${
          paymentData.storeid
        }`,
        paymentData.orderList
      );
      setModalVisible(false);
      setAlertModalVisible(true);
      setMessage(response.data.message);
    } catch (error) {
      setModalVisible(false);
      Alert.alert('결제 실패!', '서비스를 사용할수 없는 가맹점입니다.', [
        { text: '확인' },
      ]);
    }
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
    if (data.substring(2, 9) == 'storeid') {
      setModalVisible(true);
      const temp = JSON.parse(data);
      setPaymentData(temp);
    } else {
      Alert.alert(
        'QR 코드 인식 실패!',
        '가맹점의 QR 코드가 맞는지 확인해 주세요.',
        [{ text: '확인' }]
      );
    }
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
            <Pressable style={styles.reScan} onPress={() => setScanned(false)}>
              <Text style={styles.reScanText}>다시 스캔</Text>
            </Pressable>
          )}
          {modalVisible && ( // 모달
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
                          key={index}
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
                        style={[styles.closeButton, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.closeText}>취소</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.payButton, styles.buttonPay]}
                        onPress={scanFingerprint}
                      >
                        <Text style={styles.payText}>결제 </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          {!!message && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={alertModalVisible}
              onRequestClose={() => {
                setAlertModalVisible(!alertModalVisible);
              }}
            >
              <View style={styles.alertCenteredView}>
                <View style={styles.alertModalView}>
                  <Text style={styles.alertModalText}>{message}</Text>
                  <View style={{ flex: 1, width: '100%' }}>
                    <Pressable
                      style={[styles.alertButton, styles.alertButtonClose]}
                      onPress={() => {
                        setAlertModalVisible(!alertModalVisible);
                        props.navigation.navigate('Home');
                      }}
                    >
                      <Text style={styles.alertTextStyle}>닫기</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </BarCodeScanner>
    </View>
  );
};
export default QRScan;
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
    fontSize: 25,
    fontWeight: 'bold',
  },
  payButton: {
    flex: 1,
    borderBottomRightRadius: 20,
    padding: '5%',
    elevation: 2,
  },
  closeButton: {
    flex: 1,
    borderBottomLeftRadius: 20,
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

  //지문 인식 이후
  alertCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  alertModalView: {
    width: '70%',
    height: '21%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  alertButtonClose: {
    backgroundColor: '#2196F3',
  },
  alertTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  alertModalText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reScan: {
    backgroundColor: Colors.primary.backgroundColor,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  reScanText: {
    color: Colors.primary.fontColor,
    fontSize: 16,
  },
});
