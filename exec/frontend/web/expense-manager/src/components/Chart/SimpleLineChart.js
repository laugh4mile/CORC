import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SimpleLineChart = (props) => {
  return (
    <LineChart
      width={700}
      height={300}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="정산된 금액"
        stroke="#d3deff"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="사용된 금액" stroke="#7986ff" />
    </LineChart>
  );
};

export default SimpleLineChart;
