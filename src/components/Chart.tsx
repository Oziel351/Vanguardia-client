import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  title: string;
  dataIndex: string;
  data: any[];
  color?: string;
}

export const Chart: React.FC<ChartProps> = ({
  title,
  dataIndex,
  data,
  color = "#8884d8",
}) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataIndex} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={dataIndex}
            fill={color}
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
            name={title}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
