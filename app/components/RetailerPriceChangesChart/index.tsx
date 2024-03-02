import React, { useMemo } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { usePriceStore } from "@/states";
import {
  getDates,
  getStartDayDate,
  getMutiplier,
  generateRandomColor,
} from "@/utils";

function RetailerPriceChangesChart({ timeFilter, units }: any) {
  const { prices } = usePriceStore() as any;

  const keywords = useMemo(() => {
    let temp = new Set<string>();
    prices.forEach((price: any) => {
      if (!temp.has(price.item.name)) {
        temp.add(price.item.name);
      }
    });
    return [...temp];
  }, [prices]);

  const data = useMemo(() => {
    const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
      getStartDayDate(e)
    );

    const multiplier = getMutiplier(timeFilter);

    return parsedStartDay.map((element) => {
      let temp: any = { name: `${element.toDateString()}` };

      const customerPrices = prices
        .filter((e: any) => {
          return (
            element.getTime() <=
              getStartDayDate(new Date(e.createdAt)).getTime() &&
            element.getTime() + 86399999 * multiplier >=
              getStartDayDate(new Date(e.createdAt)).getTime() &&
            e.type === "Retailer"
          );
        })
        .map((e: any) => e.price);

      keywords.forEach((keyword: string) => {
        temp[keyword] = customerPrices.length;
      });

      return temp;
    });
  }, [prices, keywords, timeFilter, units]);
  return (
    <div>
      <p className="text-2xl font-black">Retailer Price Changes</p>
      <LineChart
        width={1300}
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
        {keywords.map((keyword: string) => (
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

export default RetailerPriceChangesChart;
