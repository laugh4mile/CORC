import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { SERVER_URL } from "../env";
import Button from "../components/Button";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const { width, height } = Dimensions.get("window");

const Settings = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const [storeInfo, setStoreInfo] = React.useState({});

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    let response = await axios.get(
      SERVER_URL + "/store/payment?storeId=" + userId
    );
    setStoreInfo(response.data.info);
    setIsLoading(false);
  };

  const maskEmail = (email) => {
    if (email.indexOf("@") === -1) {
      if (email.toString().length < 4) {
        return email;
      }
      return email.slice(0, -3) + "***";
    }
    let maskLen =
      email.slice(0, email.indexOf("@")).length > 3
        ? 3
        : email.slice(0, email.indexOf("@")).length;
    let pre = email.slice(0, email.indexOf("@") - maskLen);
    let post = email.slice(email.indexOf("@"));

    let mask = "";
    while (maskLen-- > 0) {
      mask += "*";
    }

    return pre + mask + post;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>내 정보</Text>
      </View>
      <View style={styles.body}>
        <Card style={styles.bodyCard}>
          {isLoading ? (
            <ActivityIndicator
              size={"large"}
              color={Colors.primary.backgroundColor}
            />
          ) : (
            <>
              <View style={styles.infoView}>
                <Text style={styles.infoName}>가맹점명</Text>
                <Text style={styles.infoValue}>{storeInfo.storeName}</Text>
              </View>
              <View style={styles.infoView}>
                <Text style={styles.infoName}>업종</Text>
                <Text style={styles.infoValue}>
                  {storeInfo.category.categoryName}
                </Text>
              </View>
              <View style={styles.infoView}>
                <Text style={styles.infoName}>주소지</Text>
                <Text style={styles.infoValue}>
                  {storeInfo.sido.sidoName} {storeInfo.gugun.gugunName}
                </Text>
              </View>
              <View style={styles.infoView}>
                <Text style={styles.infoName}>연락처</Text>
                <Text style={styles.infoValue}>{storeInfo.contact}</Text>
              </View>
              <View style={styles.infoView}>
                <Text style={styles.infoName}>이메일</Text>
                <Text style={styles.infoValue}>
                  {maskEmail(storeInfo.email)}
                </Text>
              </View>
            </>
          )}
        </Card>
      </View>
      <View style={styles.footer}>
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
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: height * 0.05,
  },
  headerText: {
    fontSize: width * 0.08,
    fontWeight: "bold",
  },
  body: {
    flex: 4,
    paddingBottom: "20%",
    justifyContent: "center",
  },
  bodyCard: {
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    justifyContent: "space-evenly",
  },
  infoView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  infoName: {
    // fontSize: width * 0.042,
    fontSize: 17,
    width: "33%",
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
    flex: 1,
  },
  footer: {
    marginBottom: 20,
  },
});
