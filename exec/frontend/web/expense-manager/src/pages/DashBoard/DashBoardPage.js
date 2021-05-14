import React from 'react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import Expenses from '../../components/DashBoard/Expenses';
import { Row, Col } from 'reactstrap';
import { NumberWidget } from '../../components/Widget';
import Card from '../../components/UI/DBCard/Card';
import useHttp from '../../hooks/use-http';
import { expenses } from '../../lib/api-dashboard';

import classes from './list.module.css';
// import { numberWidgetsData } from '../../demos/widgetPage';

const DashBoardPage = () => {
  const { sendRequest, status, data: getInfo, error } = useHttp(expenses, true);

  useEffect(() => {
    console.log('useeffect');
    sendRequest();
    console.log('useeffect1352523523235');
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className="page">
        <span className="title">DashBoard</span>
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className={classes.section}>
        <Card type="nofit">
          <Row>
            {/* {numberWidgetsData.map(({ color }, index) => (
              <Col key={index} lg={5} md={6} sm={6} xs={12} className="mb-4">
                <NumberWidget
                  title="정산 예정 금액"
                  subtitle=""
                  number=""
                  color="primary"
                  progress={{
                    value: 90,
                  }}
                />
              </Col>
            ))} */}
            <Col lg={5} md={6} sm={6} xs={12} className="mb-4">
              <Expenses
                info={getInfo}
                title="정산 예정 금액"
                subtitle=""
                color="primary"
              />
            </Col>
            {/* <Col lg={5} md={6} sm={6} xs={12} className="mb-4">
              <NumberWidget
                title="정산 예정 금액"
                subtitle=""
                // number={getInfo}
                color="primary"
                progress={{
                  value: 90,
                }}
              />
            </Col> */}
          </Row>
        </Card>
      </section>
    </div>
  );
};

export default DashBoardPage;
