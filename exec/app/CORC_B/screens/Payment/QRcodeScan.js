import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;

export default function BarcodeScan(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      Alert.alert(null, "QR Code is Not Valid!");
      setScanned(true);
      return false;
    }
    return true;
  };

  const handleBarCodeScanned = ({ type, data }) => {
    if (isJson(data)) {
      let jsonData = JSON.parse(data);
      const numExp = /^\d+$/;

      let productName = jsonData.productName;
      let price = jsonData.price;
      price = price
        ? numExp.test(price.toString()) && +price > 0
          ? price.toString()
          : ""
        : "";

      if (!productName || !price || productName === "" || price === "") {
        Alert.alert(null, "QR Code is Not Valid!");
        setScanned(true);
        return;
      }

      price = price.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

      setScanned(true);
      props.onScanned(productName, price);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[styles.container]}
      >
        <Text style={styles.description}>Scan your QR code</Text>
        {/* <Image
          style={styles.qr}
          source={{
            uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
          }}
        /> */}
        <Text
          onPress={() => {
            props.onCancel();
          }}
          style={styles.cancel}
        >
          Cancel
        </Text>
        {scanned && (
          <Text onPress={() => setScanned(false)} style={styles.cancel}>
            Tap This to Scan Again
          </Text>
        )}
      </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "gray",
    width: "150%",
  },
  qr: {
    marginTop: "20%",
    marginBottom: "20%",
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.05,
    marginBottom: "80%",
    padding: 3,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "white",
    borderRadius: 12,
  },
  cancel: {
    fontSize: width * 0.05,
    padding: 3,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "white",
    borderRadius: 12,
  },
});
