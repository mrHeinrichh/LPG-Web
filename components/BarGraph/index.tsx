"use client";
import { generateRandomColor } from "@/utils";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
} from "recharts";

interface IBarGraphArgs {
  data: any[];
  keywords: string[];
  title: string;
}

function BarGraph({ data, keywords, title }: IBarGraphArgs) {
  return (
    <div className="bg-white-50 p-5 flex flex-col gap-4 justify-center items-center">
      <p className="text-2xl font-black">{title}</p>
      <BarChart
        width={1200}
        height={400}
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
        {keywords.map((e: any) => (
          <Bar
            key={e}
            dataKey={e}
            fill={generateRandomColor()}
            activeBar={
              <Rectangle
                fill={generateRandomColor()}
                stroke={generateRandomColor()}
              />
            }
          />
        ))}
      </BarChart>
    </div>
  );
}

export default BarGraph;
