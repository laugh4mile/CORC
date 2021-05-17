import React from "react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
// import axios from 'axios';

import ActiveShapePieChart from "../components/Chart/ActiveShapePieChart";
import useHttp from "../hooks/use-http";

import { expenseForStatistics } from "../lib/api-dashboard";
import classes from "./DashBoardPage.module.css";

const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const DashBoardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemList, setitemList] = useState([]);
  const [total, settotal] = useState(0);
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const {
    sendRequest: sendStatistics,
    status: statusStatistics,
    data: loadedStatistics,
    error: errorStatistics,
  } = useHttp(expenseForStatistics, true);

  useEffect(() => {
    sendStatistics();
  }, [sendStatistics]);

  console.log("loadedStatistics", loadedStatistics);

  const sort = (array, keyName, subName) => {
    let copied = JSON.parse(JSON.stringify(array));

    return copied.sort((a, b) => {
      if (a[keyName] < b[keyName]) {
        return 1;
      }
      if (a[keyName] > b[keyName]) {
        return -1;
      }
      if (a[keyName] == b[keyName]) {
        if (subName && a[subName]) {
          if (a[subName] < b[subName]) {
            return 1;
          }
          if (a[subName] > b[subName]) {
            return -1;
          }
          return 0;
        }
        return 0;
      }
    });
  };

  useEffect(() => {
    makeChart();
  }, []);

  const makeChart = async () => {
    setIsLoading(true);
    var response = await axios.get("/board/expenses/statistics");
    setitemList([]);
    var payments;
    var copiedItemList = [];
    var totalSum = 0;
    var users = [];
    var categories = [];

    if (response.data !== undefined && !response.data.category.empty) {
      payments = response.data.category;

      for (let i = 0; i < payments.length; i++) {
        // 매장별 금액 통계
        var isContained2 = false;
        const item2 = payments[i].user;
        for (let k = 0; k < users.length; k++) {
          if (users[k].name == item2.department) {
            users[k].value += payments[i].total;
            isContained2 = true;
            break;
          }
        }
        if (!isContained2) {
          users.push({
            name: item2.department,
            value: payments[i].total,
          });
        }

        // 카테고리별 금액 통계
        var isContained3 = false;
        const item3 = payments[i].store;
        for (let k = 0; k < categories.length; k++) {
          if (categories[k].name == item3.category.categoryName) {
            categories[k].value += payments[i].total;
            isContained3 = true;
            break;
          }
        }
        if (!isContained3) {
          categories.push({
            name: item3.category.categoryName,
            value: payments[i].total,
          });
        }
      }
    }

    setUserList(users, "value");
    setCategoryList(categories, "value");
    settotal(totalSum);

    setIsLoading(false);
  };

  if (statusStatistics === "pending") {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (errorStatistics) {
    return <p className="centered focused">{errorStatistics}</p>;
  }

  if (!loadedStatistics) {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <span className={classes.inform}>통계 정보를 불러올 수 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="page">
      <span className="title">대쉬보드</span>
      <div className={classes.container}>
        <section className={classes["section-center"]}></section>
        <section className={classes["section-right"]}>
          <article className={classes.card}>
            <span className={classes.title}>소비 품목 현황</span>
            <ActiveShapePieChart data={categoryList} />
          </article>
          <article className={classes.card}>
            <span className={classes.title}>부서별 소비 현황</span>
            <ActiveShapePieChart data={userList} />
          </article>
        </section>
      </div>
    </div>
  );
};

export default DashBoardPage;
