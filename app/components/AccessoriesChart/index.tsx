"use client";
import { ITEM_CATEGORIES } from "@/constants";
import { useTransactionStore } from "@/states";
import { useMemo } from "react";
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

export default function AccessoriesChart() {
  const { solds } = useTransactionStore() as any;

  const keywords = useMemo(() => {
    const itemsList = solds.map((sold: any) => sold.items);
    const temp = new Set<string>();
    itemsList.forEach((items: any) => {
      items.forEach((item: any) => {
        if (
          !temp.has(item.name) &&
          item.category == ITEM_CATEGORIES.ACCESSORIES
        ) {
          temp.add(item.name);
        }
      });
    });

    return [...temp];
  }, [solds]);

  const data = useMemo(() => {
    const itemsList = solds.map((sold: any) => sold.items);

    return keywords.map((keyword: any) => {
      let temp: any = { name: keyword };
      itemsList.forEach((items: any[]) => {
        if (!temp[keyword]) {
          temp[keyword] = items.filter(
            (item: any) => item.name == keyword
          ).length;
          return;
        }
        temp[keyword] =
          temp[keyword] +
          items.filter((item: any) => item.name == keyword).length;
      });

      return temp;
    });
  }, [solds]);

  return (
    <div>
      <p className="text-2xl font-bold">Accessories</p>
      <BarChart
        width={1000}
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
        {keywords.map((e: any) => (
          <Bar
            key={e}
            dataKey={e}
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        ))}

        {/* <Bar
          dataKey="products"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        /> */}
      </BarChart>
    </div>
  );
}
