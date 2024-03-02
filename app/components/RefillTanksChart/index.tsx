"use client";
import { ITEM_CATEGORIES } from "@/constants";
import { useTransactionStore } from "@/states";
import {
  generateRandomColor,
  getDates,
  getMutiplier,
  getStartDayDate,
} from "@/utils";
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

export default function RefillTanksChart({
  timeFilter,
  units,
  baranggay,
}: any) {
  const { solds } = useTransactionStore() as any;

  const keywords = useMemo(() => {
    const itemsList = solds.map((sold: any) => sold.items);
    const temp = new Set<string>();
    itemsList.forEach((items: any) => {
      items.forEach((item: any) => {
        if (
          !temp.has(item.name) &&
          item.category == ITEM_CATEGORIES.REFILL_TANKS
        ) {
          temp.add(item.name);
        }
      });
    });

    return [...temp];
  }, [solds]);

  const data = useMemo(() => {
    const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
      getStartDayDate(e)
    );

    const multiplier = getMutiplier(timeFilter);

    return parsedStartDay.map((e: Date) => {
      let temp: any = {};
      keywords.forEach((keyword: any) => {
        temp[keyword] = 0;
      });

      let transactionsTemp = solds.filter((sold: any) => {
        return (
          e.getTime() <= getStartDayDate(new Date(sold.createdAt)).getTime() &&
          e.getTime() + 86399999 * multiplier >=
            getStartDayDate(new Date(sold.createdAt)).getTime()
        );
      });

      if (baranggay != "All") {
        transactionsTemp = transactionsTemp.filter((sold: any) => {
          return sold.__t == "Delivery" && sold.barangay == baranggay;
        });
      }

      const itemsList = transactionsTemp.map((sold: any) => sold.items);

      itemsList.forEach((items: any[]) => {
        keywords.forEach((keyword: string) => {
          temp[keyword] =
            temp[keyword] +
            items.filter(
              (item: any) =>
                item.name == keyword &&
                item.category == ITEM_CATEGORIES.REFILL_TANKS
            ).length;
        });
      });

      return {
        name: e.toDateString(),
        ...temp,
      };
    });
  }, [solds, timeFilter, units, baranggay, keywords]);

  return (
    <div>
      <p className="text-2xl font-bold">Refill Tanks</p>
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
