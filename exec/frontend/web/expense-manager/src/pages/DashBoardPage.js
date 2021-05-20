import React, { useEffect, useState, useCallback } from "react";

import useHttp from "../hooks/use-http";
import {
  expenses,
  recentPayment,
  expenseByMonth,
  expenseForStatistics,
} from "../lib/api-dashboard";
import { getAllRequestedStores } from "../lib/api-store";

import PeerStatus from "../components/Chart/PeerStatus";

import PercentageBar from "../components/Chart/PercentageBar";
import ActiveShapePieChart from "../components/Chart/ActiveShapePieChart";
import SimpleAreaChart from "../components/Chart/SimpleAreaChart";
import VerifiedDataChart from "../components/Chart/VerifiedDataChart";

import PaymentList from "../components/DashBoard/PaymentList";
import RequestedStoreList from "../components/DashBoard/RequestedStoreList";

import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";

import classes from "./DashBoardPage.module.css";

const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const DashBoardPage = () => {
  const {
    sendRequest: sendExpenses,
    status: statusExpenses,
    data: expensesData,
    error: errorExpenses,
  } = useHttp(expenses, true);

  const {
    sendRequest: sendRequested,
    status: statusRequested,
    data: loadedStores,
    error: errorRequested,
  } = useHttp(getAllRequestedStores, true);

  const {
    sendRequest: sendPayment,
    status: statusPayment,
    data: loadedPayment,
    error: errorPayment,
  } = useHttp(recentPayment, true);

  const {
    sendRequest: sendByMonth,
    status: statusByMonth,
    data: loadedByMonth,
    error: errorByMonth,
  } = useHttp(expenseByMonth, true);

  const {
    sendRequest: sendStatistics,
    status: statusStatistics,
    data: loadedStatistics,
    error: errorStatistics,
  } = useHttp(expenseForStatistics, true);

  const [isLoading, setIsLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 5 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

  const [itemList, setitemList] = useState([]);
  const [total, settotal] = useState(0);
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [monthList, setMonthList] = useState([]);

  const newDate = new Date();
  const year = newDate.getFullYear();

  useEffect(() => {
    sendExpenses();
    sendPayment(pageInfo);
    sendRequested(pageInfo);
    sendByMonth(year);
    sendStatistics();
  }, [
    sendExpenses,
    sendPayment,
    sendRequested,
    sendByMonth,
    sendStatistics,
    year,
    pageInfo,
  ]);

  useEffect(() => {
    makeChart();
  }, []);

  const [sectionCenterWidth, setSectionCenterWidth] = useState(0);

  const sectionCenterRef = useCallback((node) => {
    if (node !== null) {
      setSectionCenterWidth(node.getBoundingClientRect().height);
    }
  }, []);

  const makeChart = async () => {
    setIsLoading(true);
    var response = await axios.get("/board/expenses/statistics");
    setitemList([]);
    let payments;
    let totalSum = 0;
    let users = [];
    let categories = [];

    if (response.data !== undefined && !response.data.category.empty) {
      payments = response.data.category;

      for (const payment of payments) {
        // 매장별 금액 통계
        let departmentIsContained = false;
        const currUser = payment.user;
        for (const user of users) {
          if (user.name === currUser.department) {
            user.value += payment.total;
            departmentIsContained = true;
            break;
          }
        }
        if (!departmentIsContained) {
          users.push({
            name: currUser.department,
            value: payment.total,
          });
        }

        // 카테고리별 금액 통계
        let categoryIsContained = false;
        const currStore = payment.store;
        for (const category of categories) {
          if (category.name === currStore.category.categoryName) {
            category.value += payment.total;
            categoryIsContained = true;
            break;
          }
        }
        if (!categoryIsContained) {
          categories.push({
            name: currStore.category.categoryName,
            value: payment.total,
          });
        }
      }
    }

    setUserList(users);
    setCategoryList(categories);
    settotal(totalSum);

    setIsLoading(false);
  };

  if (
    statusExpenses === "pending" ||
    statusRequested === "pending" ||
    statusPayment === "pending" ||
    statusByMonth === "pending" ||
    statusStatistics === "pending"
  ) {
    return (
      <div className="page">
        {/* <span className="title">대쉬보드</span> */}
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  const monthData = [];

  for (let i = 1; i <= 12; i++) {
    monthData.push({
      name: i,
      "사용된 금액": loadedByMonth[i][0],
      "정산된 금액": loadedByMonth[i][1],
    });
  }

  const convertRemToPixels = (rem) =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

  return (
    <div className="page">
      <div className={classes.container}>
        <section
          className={`${classes.section} ${classes["section-center"]}`}
          ref={sectionCenterRef}
        >
          <article className={classes.article}>
            <PercentageBar
              title={"사용된 금액"}
              value={expensesData.used}
              maxValue={expensesData.assignedTotal}
              label={expensesData.used}
            />
            <PercentageBar
              title={"정산 예정 금액"}
              value={expensesData.notConfirmed}
              maxValue={expensesData.used}
              label={expensesData.notConfirmed}
              fill={"#BBCEFF"}
            />
          </article>
          <article>
            <SimpleAreaChart
              data={monthData}
              width={convertRemToPixels(42)}
              height={convertRemToPixels(20)}
            />
          </article>
          <article className={classes.article}>
            <RequestedStoreList stores={loadedStores.content} />
            <PaymentList payments={loadedPayment.content} />
          </article>
        </section>
        <section className={`${classes.section} ${classes["section-right"]}`}>
          <PeerStatus />
          <VerifiedDataChart />
          <ActiveShapePieChart title={"소비 품목 현황"} data={categoryList} />
          <ActiveShapePieChart title={"부서별 소비 현황"} data={userList} />
        </section>
      </div>
    </div>
  );
};

export default DashBoardPage;
