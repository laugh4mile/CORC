import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Button from '../components/Button';
import axios from 'axios';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import Card from '../components/Card';
import SERVER_URL from '../env';

const Settings = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const [userInfo, setUserInfo] = useState();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  useEffect(() => {
    (async () => {
      let response = await axios.get(
        SERVER_URL + '/admin/user/info?userId=' + userId
      );
      setUserInfo(response.data);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text style={styles.title}>내 정보</Text>
      </View>

      <Card
        style={{
          marginBottom: '10%',
          marginTop: '10%',
          flex: 3,
          justifyContent: 'center',
        }}
      >
        <ScrollView style={styles.scroll}>
          <View style={styles.rows}>
            <View style={styles.leftRow}>
              <Text style={styles.indexColumn}>이름</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.contentColumn}>{userInfo.info.userName}</Text>
            </View>
          </View>
          <View style={styles.rows}>
            <View style={styles.leftRow}>
              <Text style={styles.indexColumn}>사번</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.contentColumn}>
                {userInfo.info.employeeNum}
              </Text>
            </View>
          </View>
          <View style={styles.rows}>
            <View style={styles.leftRow}>
              <Text style={styles.indexColumn}>주소지</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.contentColumn}>
                {userInfo.info.sido.sidoName} {userInfo.info.gugun.gugunName}
              </Text>
            </View>
          </View>
          <View style={styles.rows}>
            <View style={styles.leftRow}>
              <Text style={styles.indexColumn}>직급</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.contentColumn}>{userInfo.info.position}</Text>
            </View>
          </View>
          <View style={styles.rows}>
            <View style={styles.leftRow}>
              <Text style={styles.indexColumn}>email</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.contentColumn}>{userInfo.info.email}</Text>
            </View>
          </View>
        </ScrollView>
      </Card>
      <View style={styles.logoutButton}>
        <Button
          title="Logout"
          backgroundColor={Colors.cancel.backgroundColor}
          fontColor={Colors.cancel.fontColor}
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: '10%',
    backgroundColor: 'white',
  },
  contents: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: '30%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginBottom: '20%',
  },
  scroll: {
    marginVertical: 10,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  leftRow: {
    flex: 2,
  },
  rightRow: {
    flex: 3,
  },
  indexColumn: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3F3F42',
  },
  contentColumn: {
    fontSize: 18,
    color: '#3F3F42',
  },
});
