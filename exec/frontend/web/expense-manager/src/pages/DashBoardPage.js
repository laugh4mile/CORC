import React from "react";

import ActiveShapePieChart from "../components/Chart/ActiveShapePieChart";
import VerifiedDataChart from "../components/Chart/VerifiedDataChart";

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
  return (
    <div className="page">
      <span className="title">대쉬보드</span>
      <div className={classes.container}>
        <section className={classes["section-center"]}></section>
        <section className={classes["section-right"]}>
          <article className={classes.card}>
            <span className={classes.title}>소비 품목 현황</span>
            <ActiveShapePieChart data={data_consumedCategory} />
          </article>
          <article className={classes.card}>
            <span className={classes.title}>부서별 소비 현황</span>
            <ActiveShapePieChart data={data_consumedDepartment} />
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
