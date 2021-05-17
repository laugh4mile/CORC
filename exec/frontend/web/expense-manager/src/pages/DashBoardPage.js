import React from "react";

import PercentageBar from "../components/Chart/PercentageBar";
import ActiveShapePieChart from "../components/Chart/ActiveShapePieChart";
import SimpleAreaChart from "../components/Chart/SimpleAreaChart";

import Card from "../components/UI/Card/Card";

import classes from "./DashBoardPage.module.css";

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
