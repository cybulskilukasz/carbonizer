import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface EstimatesChartProps {
  data: EstimatesChartData[];
  options: LineChartOptions;
}

interface EstimatesChartData {
  date: string | Date;
  value: number;
}

interface LineChartOptions {
  strokeColor: string;
  fillColor: string;
}

const EstimatesChart: React.FC<EstimatesChartProps> = ({ data, options }) => {
  return (
    <ResponsiveContainer width={"100%"} height={360}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="mainColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10FDA8" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#1EF9DF" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <XAxis
          fontFamily={"Roboto, sans-serif"}
          fontSize={"0.75rem"}
          dataKey="date"
          tickFormatter={(value) =>
            new Intl.DateTimeFormat("de").format(new Date(value))
          }
        />
        <YAxis
          style={{
            fontSize: "0.75rem",
            fontFamily: "Roboto",
          }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke={options.strokeColor}
          fill={"url(#mainColor)"}
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EstimatesChart;
