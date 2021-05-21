import React from "react";
import { useEffect, useState, PureComponent } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { Row, Col, Card, CardHeader, CardBody, Container } from "reactstrap";
import useHttp from "../../hooks/use-http";
import { getColor } from "../../utils/colors";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import ActiveShapePieChart from "../../components/Chart/ActiveShapePieChart";
import PaymentList from "../../components/DashBoard/PaymentList";
import RequestedStoreList from "../../components/DashBoard/RequestedStoreList";
import Expenses from "../../components/DashBoard/Expenses";
import TotalExpenses from "../../components/DashBoard/TotalExpenses";
import VerifiedDataChart from "../../components/Chart/VerifiedDataChart";
import { getAllRequestedStores } from "../../lib/api-store";
import { expenses, recentPayment, expenseByMonth, expenseForStatistics } from "../../lib/api-dashboard";

import CCard from "../../components/UI/DBCard/Card";
import classes from "./list.module.css";

const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const DashBoardPage = () => {
  const { sendRequest: sendExpenses, status: statusExpenses, data: getInfo, error: errorExpenses } = useHttp(expenses, true);

  const {
    sendRequest: sendRequested,
    status: statusRequested,
    data: loadedStores,
    error: errorRequested,
  } = useHttp(getAllRequestedStores, true);

  const { sendRequest: sendPayment, status: statusPayment, data: loadedPayment, error: errorPayment } = useHttp(recentPayment, true);

  const { sendRequest: sendByMonth, status: statusByMonth, data: loadedByMonth, error: errorByMonth } = useHttp(expenseByMonth, true);

  const {
    sendRequest: sendStatistics,
    status: statusStatistics,
    data: loadedStatistics,
    error: errorStatistics,
  } = useHttp(expenseForStatistics, true);

  const [pageInfo, setPageInfo] = useState({ page: 0, size: 5 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

  const [isLoading, setIsLoading] = useState(true);
  const [itemList, setitemList] = useState([]);
  const [total, settotal] = useState(0);
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [monthList, setMonthList] = useState([]);

  let newDate = new Date();
  let year = newDate.getFullYear();

  useEffect(() => {
    sendExpenses();
    sendPayment(pageInfo);
    sendRequested(pageInfo);
    sendByMonth(year);
    sendStatistics();
  }, [sendExpenses, sendPayment, sendRequested, sendByMonth, sendStatistics, year, pageInfo]);

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

    setUserList(users);
    setCategoryList(categories);
    settotal(totalSum);

    setIsLoading(false);
  };

  if (
    statusExpenses === "pending" &&
    statusRequested === "pending" &&
    statusPayment === "pending" &&
    statusByMonth === "pending" &&
    statusStatistics === "pending"
  ) {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (errorExpenses) {
    return <p className="centered focused">{errorExpenses}</p>;
  }

  if (errorRequested) {
    return <p className="centered focused">{errorRequested}</p>;
  }

  if (errorPayment) {
    return <p className="centered focused">{errorPayment}</p>;
  }

  if (errorByMonth) {
    return <p className="centered focused">{errorByMonth}</p>;
  }

  if (errorStatistics) {
    return <p className="centered focused">{errorStatistics}</p>;
  }

  if (!getInfo) {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <span className={classes.inform}>결제 정보 불러올 수 없습니다.</span>
      </div>
    );
  }

  if (!loadedStores) {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <span className={classes.inform}>가맹점 신청 목록을 불러올 수 없습니다.</span>
      </div>
    );
  }

  if (!loadedPayment) {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <span className={classes.inform}>최근 결제 내역을 불러올 수 없습니다.</span>
      </div>
    );
  }

  if (!loadedByMonth) {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <span className={classes.inform}>월간 소비량을 불러올 수 없습니다.</span>
      </div>
    );
  }

  if (!loadedStatistics) {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <span className={classes.inform}>통계 정보를 불러올 수 없습니다.</span>
      </div>
    );
  }

  const MONTHS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  const monthData = [];

  for (let i = 1; i <= 12; i++) {
    monthData.push({
      name: i,
      "사용된 금액": loadedByMonth[i][0],
      "정산된 금액": loadedByMonth[i][1],
    });
  }

  const genLineData = (moreData = {}) => {
    return {
      labels: MONTHS,
      datasets: [
        {
          label: "총 소비",
          backgroundColor: getColor("primary"),
          borderColor: getColor("primary"),
          borderWidth: 1,
          data: monthData,
          ...moreData,
        },
      ],
    };
  };

  return (
    <div className="page">
      <span className="title">대쉬보드</span>
      <div className={classes.container}>
        {/* <Row>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Expenses info={getInfo} title="정산 예정 금액" color="primary" />
          </Col>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            {/* lg={10} md={6} sm={6} xs={12} className="mb-4" */}
        {/* lg={4} md={6} sm={6} xs={12} className="mb-3" */}
        {/* mb-3 col-12 col-sm-6 col-md-6 col-lg-4 */}
        {/* <TotalExpenses info={getInfo} title="사용된 금액" color="primary" />
          </Col>
        </Row> */}
        {/* <Row>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>월간 소비량</CardHeader>
              <CardBody>
                <Line
                  data={genLineData()}
                  options={{
                    scales: {
                      xAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: '월',
                          },
                        },
                      ],
                      yAxes: [
                        {
                          stacked: true,
                          scaleLabel: {
                            display: true,
                            labelString: '원',
                          },
                        },
                      ],
                    },
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        {/* <Row>
          <CCard type="nofit">
            <Col>
              <RequestedStoreList stores={loadedStores.content} />
            </Col>
          </CCard>
          <CCard type="nofit">
            <Col>
              <PaymentList payments={loadedPayment.content} />
            </Col>
          </CCard>
        </Row> */}
        <section className={classes["section-left"]}>
          <article className={classes.card}>
            <Expenses info={getInfo} title="정산 예정 금액" color="primary" />
          </article>
          <article className={classes.card}>
            <TotalExpenses info={getInfo} title="사용된 금액" color="primary" />
          </article>
          <article className={classes.card}>
            <RequestedStoreList stores={loadedStores.content} />
          </article>
          <article className={classes.card}>
            <PaymentList payments={loadedPayment.content} />
          </article>
        </section>
        <section className={classes["section-center"]}>
          {/* <Row>
            <Col xl={6} lg={12} md={12}>
              <Card>
                <CardHeader>월간 소비량</CardHeader>
                <CardBody>
                  <Line
                    data={genLineData()}
                    options={{
                      scales: {
                        xAxes: [
                          {
                            scaleLabel: {
                              display: true,
                              labelString: '월',
                            },
                          },
                        ],
                        yAxes: [
                          {
                            stacked: true,
                            scaleLabel: {
                              display: true,
                              labelString: '원',
                            },
                          },
                        ],
                      },
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={monthData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label="월" />
              <YAxis label="원" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="사용된 금액" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="정산된 금액" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </section>
        <section className={classes["section-right"]}>
          <article className={classes.card}>
            <span className={classes.title}>소비 품목 현황</span>
            <ActiveShapePieChart data={categoryList} />
          </article>
          <article className={classes.card}>
            <span className={classes.title}>부서별 소비 현황</span>
            <ActiveShapePieChart data={userList} />
          </article>
          <article className={classes.card}>
            <span className={classes.title}>데이터 검증 현황</span>
            <VerifiedDataChart />
          </article>
        </section>
      </div>
    </div>
  );
};

export default DashBoardPage;
