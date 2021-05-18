import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../../components/UI/Card/Card";

import "./Chart.css";

const SimpleAreaChart = (props) => {
  return (
    <Card unset>
      <AreaChart
        width={700}
        height={250}
        data={props.data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#32499A" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7986FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPayback" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7986FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#D3DEFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="사용된 금액"
          stroke="#32499A"
          fill="url(#colorUsed)"
          fillOpacity={0.2}
        />
        <Area
          type="monotone"
          dataKey="정산된 금액"
          stroke="#7986FF"
          fill="url(#colorPayback)"
          fillOpacity={0.3}
        />
      </AreaChart>
    </Card>
  );
};

export default SimpleAreaChart;
