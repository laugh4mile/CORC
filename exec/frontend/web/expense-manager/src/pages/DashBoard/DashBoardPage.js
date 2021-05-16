import React from 'react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import { Row, Col, Card, CardHeader, CardBody, Container } from 'reactstrap';
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';
import useHttp from '../../hooks/use-http';
import { getColor } from '../../utils/colors';
import { randomNum } from '../../utils/demos';

import PaymentList from '../../components/DashBoard/PaymentList';
import RequestedStoreList from '../../components/DashBoard/RequestedStoreList';
import Expenses from '../../components/DashBoard/Expenses';
import TotalExpenses from '../../components/DashBoard/TotalExpenses';
import { getAllRequestedStores } from '../../lib/api-store';
import {
  expenses,
  recentPayment,
  expenseByMonth,
  expenseForStatistics,
} from '../../lib/api-dashboard';

import CCard from '../../components/UI/DBCard/Card';
import classes from './list.module.css';
import Page from '../../components/Pagenation';

const DashBoardPage = () => {
  const {
    sendRequest: sendExpenses,
    status: statusExpenses,
    data: getInfo,
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

  const [pageInfo, setPageInfo] = useState({ page: 0, size: 5 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

  let newDate = new Date();
  let year = newDate.getFullYear();

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

  if (
    statusExpenses === 'pending' &&
    statusRequested === 'pending' &&
    statusPayment === 'pending' &&
    statusByMonth === 'pending' &&
    statusStatistics === 'pending'
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
        <span className={classes.inform}>
          가맹점 신청 목록을 불러올 수 없습니다.
        </span>
      </div>
    );
  }

  if (!loadedPayment) {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <span className={classes.inform}>
          최근 결제 내역을 불러올 수 없습니다.
        </span>
      </div>
    );
  }

  if (!loadedByMonth) {
    return (
      <div className="page">
        <span className="title">대쉬보드</span>
        <span className={classes.inform}>
          월간 소비량을 불러올 수 없습니다.
        </span>
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

  console.log('getInfo', getInfo);
  console.log('loadedStores', loadedStores);
  console.log('loadedPayment', loadedPayment);
  console.log('loadedByMonth', loadedByMonth);
  console.log('loadedStatistics', loadedStatistics);

  // const MONTHS = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];

  const MONTHS = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  const monthData = [];

  for (let i = 1; i <= 12; i++) {
    monthData.push(loadedByMonth[i]);
  }

  console.log('monthData', monthData);

  const genLineData = (moreData = {}) => {
    return {
      labels: MONTHS,
      datasets: [
        {
          label: '총 소비',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: monthData,
          ...moreData,
        },
      ],
    };
  };

  const genPieData1 = () => {
    return {
      datasets: [
        {
          data: [
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
          ],
          backgroundColor: [
            getColor('primary'),
            getColor('secondary'),
            getColor('success'),
            getColor('info'),
            getColor('danger'),
          ],
          label: 'Dataset 1',
        },
      ],
      labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
    };
  };

  const genPieData2 = () => {
    return {
      datasets: [
        {
          data: [
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
            randomNum(),
          ],
          backgroundColor: [
            getColor('primary'),
            getColor('secondary'),
            getColor('success'),
            getColor('info'),
            getColor('danger'),
          ],
          label: 'Dataset 1',
        },
      ],
      labels: ['', '', '', '', ''],
    };
  };

  return (
    <div className="page">
      <section className="classes.section">
        <Row>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Expenses info={getInfo} title="정산 예정 금액" color="primary" />
          </Col>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            {/* lg={10} md={6} sm={6} xs={12} className="mb-4" */}
            {/* lg={4} md={6} sm={6} xs={12} className="mb-3" */}
            {/* mb-3 col-12 col-sm-6 col-md-6 col-lg-4 */}
            <TotalExpenses info={getInfo} title="사용된 금액" color="primary" />
          </Col>
        </Row>
        <Row>
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
          <Col xl={3} lg={6} md={6}>
            <Card>
              <CardHeader>부서별 소비 현황</CardHeader>
              <CardBody>
                <Pie data={genPieData1()} />
              </CardBody>
            </Card>
          </Col>
          <Col xl={3} lg={12} md={12}>
            <Card>
              <CardHeader>소비 품목 현황</CardHeader>
              <CardBody>
                <Pie data={genPieData2()} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
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
        </Row>
      </section>
    </div>
  );
};

export default DashBoardPage;
