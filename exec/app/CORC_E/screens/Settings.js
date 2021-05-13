import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

const Settings = () => {
  const dispatch = useDispatch();
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const itemList = [
    {
      amount: 5,
      color: '#400000',
      legendFontColor: '#050505',
      legendFontSize: 16,
      priceSum: 'sibal',
      storeName: '스타벅스',
    },
    {
      amount: 1,
      color: '#800000',
      legendFontColor: '#050505',
      legendFontSize: 16,
      priceSum: 'sibal',
      storeName: '형제슈퍼',
    },
  ];
  console.log(itemList);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        backgroundColor={Colors.cancel.backgroundColor}
        fontColor={Colors.cancel.fontColor}
        onPress={() => {
          dispatch(authActions.logout());
        }}
      />
      <LineChart
        data={data}
        width={200}
        height={220}
        chartConfig={chartConfig}
        bezier
      />
      <PieChart
        style={{ marginTop: '10%' }}
        data={itemList}
        width={200}
        height={200}
        chartConfig={chartConfig}
        accessor={'amount'}
        backgroundColor={'transparent'}
        center={[10, 0]}
        absolute
      />
      <Text style={styles.basisText}>[판매 수량 기준]</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
  },
});
