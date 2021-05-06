import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(JSON.parse(data));
    alert(`${data}`);
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
});
