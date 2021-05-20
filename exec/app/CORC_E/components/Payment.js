import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import StoreIcon from './icons/StoreIcon';
import CoffeeIcon from './icons/CoffeeIcon';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';
import * as Icon from './icons/IconByCategory';

function Payment({ date, store, total, categoryCode, paymentitem }) {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const time = date.substring(11, 16);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function getIconName(categoryCode) {
    const iconName = Icon.GetIcon(categoryCode);
    return iconName;
  }
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
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
              }}
            >
              <Text style={styles.modalText}>{store.storeName}</Text>
              <Text style={styles.modalDate}>
                {' '}
                {year}-{month}-{day} {time}{' '}
              </Text>
              {paymentitem.map((item, index) => (
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
                    <Text>￦ {numberWithCommas(item.price * item.amount)}</Text>
                  </View>
                </View>
              ))}
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginVertical: 15,
                }}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    ￦ {numberWithCommas(total)}
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View style={{ justifyContent: 'flex-end', marginTop: 10 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}
      >
        <View style={{ justifyContent: 'center', marginRight: 20 }}>
          {getIconName(categoryCode).family == 'StoreIcon' && (
            <StoreIcon color={'#414251'} size={27} />
          )}
          {getIconName(categoryCode).family == 'CoffeeIcon' && (
            <CoffeeIcon color={'#414251'} size={27} />
          )}
          {getIconName(categoryCode).family == 'MaterialCommunityIcons' && (
            <MaterialCommunityIcons
              name={getIconName(categoryCode).iconName}
              size={24}
              color="#414251"
            />
          )}
          {getIconName(categoryCode).family == 'FontAwesome5' && (
            <FontAwesome5
              name={getIconName(categoryCode).iconName}
              size={24}
              color="#414251"
            />
          )}
          {getIconName(categoryCode).family == 'Ionicons' && (
            <Ionicons
              name={getIconName(categoryCode).iconName}
              size={24}
              color="#414251"
            />
          )}
          {getIconName(categoryCode).family == 'MaterialIcons' && (
            <MaterialIcons
              name={getIconName(categoryCode).iconName}
              size={24}
              color="#414251"
            />
          )}
        </View>
        <View style={{ flex: 2 }}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={{ fontSize: 18, color: '#414251' }}>
              {store.storeName}
              {/*  */}
            </Text>
          </Pressable>
          <Text style={{ color: '#7B7A7A' }}>{time}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 17, color: '#414251' }}>
              {numberWithCommas(total)}
            </Text>
            <Text style={{ marginLeft: 5, color: '#414251' }}>원</Text>
          </View>
          <Text style={{ color: '#7B7A7A' }}>결제</Text>
        </View>
      </View>
    </View>
  );
}

Payment.propTypes = {};

export default Payment;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.50)',
  },
  modalView: {
    width: '85%',
    height: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalDate: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
