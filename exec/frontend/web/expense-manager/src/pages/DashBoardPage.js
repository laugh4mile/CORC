import React from "react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
// import axios from 'axios';

import PercentageBar from "../components/Chart/PercentageBar";
import ActiveShapePieChart from "../components/Chart/ActiveShapePieChart";
import SimpleAreaChart from "../components/Chart/SimpleAreaChart";

import Card from "../components/UI/Card/Card";
import useHttp from "../hooks/use-http";

import { expenseForStatistics } from "../lib/api-dashboard";
import classes from "./DashBoardPage.module.css";

const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const DashBoardPage = () => {
  const data_consumedCategory = [
    { name: "식음료", value: 100000000 },
    { name: "접대비", value: 12000000 },
    { name: "오피스 용품", value: 6000000 },
    { name: "출장비", value: 30000000 },
  ];

  const data_consumedDepartment = [
    { name: "디지털 전략부", value: 100000000 },
    { name: "디지털 사업부", value: 12000000 },
    { name: "디지털R&D센터", value: 6000000 },
    { name: "빅데이터센터", value: 30000000 },
    { name: "업무혁신부", value: 30000000 },
  ];

  const data_monthlyConsumed = [
    {
      name: "1",
      "정산된 금액": 4000,
      "사용된 금액": 2400,
      amt: 2400,
    },
    {
      name: "5",
      "정산된 금액": 3000,
      "사용된 금액": 1398,
      amt: 2210,
    },
    {
      name: "10",
      "정산된 금액": 2000,
      "사용된 금액": 9800,
      amt: 2290,
    },
    {
      name: "15",
      "정산된 금액": 2780,
      "사용된 금액": 3908,
      amt: 2000,
    },
    {
      name: "20",
      "정산된 금액": 1890,
      "사용된 금액": 4800,
      amt: 2181,
    },
    {
      name: "25",
      "정산된 금액": 2390,
      "사용된 금액": 3800,
      amt: 2500,
    },
    {
      name: "31",
      "정산된 금액": 3490,
      "사용된 금액": 4300,
      amt: 2100,
    },
  ];

  const data_consumedMoney = {
    used: 100500000,
    allocated: 200000000,
    willBePaypacked: 86500000,
  };

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
      {/* <span className="title">대쉬보드</span> */}
      <div className={classes.container}>
        <section className={`${classes.section} ${classes["section-center"]}`}>
          <article className={classes.article}>
            <PercentageBar
              title={"정산 예정 금액"}
              value={data_consumedMoney.willBePaypacked}
              maxValue={data_consumedMoney.used}
              label={data_consumedMoney.willBePaypacked}
            />
            <PercentageBar
              title={"사용된 금액"}
              value={data_consumedMoney.used}
              maxValue={data_consumedMoney.allocated}
              label={data_consumedMoney.used}
              fill={"#D3DEFF"}
            />
          </article>
          <SimpleAreaChart data={data_monthlyConsumed} />
          <article className={classes.article}>
            <Card></Card>
            <Card></Card>
          </article>
        </section>
        <section className={`${classes.section} ${classes["section-right"]}`}>
          <ActiveShapePieChart
            title={"소비 품목 현황"}
            data={data_consumedCategory}
          />
          <ActiveShapePieChart
            title={"부서별 소비 현황"}
            data={data_consumedDepartment}
          />
        </section>
      </div>
    </div>
  );
};

export default DashBoardPage;
