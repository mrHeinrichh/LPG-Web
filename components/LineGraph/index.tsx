"use client";
import { generateRandomColor } from "@/utils";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";

interface ILineGraphArgs {
  data: any[];
  keywords: string[];
  title: string;
}

function LineGraph({ data, keywords, title }: ILineGraphArgs) {
  return (
    <div className="bg-white-50 p-5 flex flex-col gap-4 justify-center items-center">
      <p className="text-2xl font-black">{title}</p>
      <LineChart
        width={1200}
        height={300}
        data={data}
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
        {keywords.map((keyword) => (
          <Line
            key={keyword}
            type="monotone"
            dataKey={keyword}
            stroke={generateRandomColor()}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </div>
  );
}

export default LineGraph;
