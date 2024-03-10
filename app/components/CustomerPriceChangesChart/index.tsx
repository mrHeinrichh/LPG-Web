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

function PriceChangesChart({ timeFilter, units }: any) {
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
            e.type === "Customer"
          );
        })
        .map((e: any) => e);

      keywords.forEach((keyword: string) => {
        const priceTemp = customerPrices.filter(
          (e: any) => e.item.name == keyword
        );
        temp[keyword] = 0;
        if (priceTemp.length !== 0) {
          temp[keyword] = Math.max(...priceTemp.map((e: any) => e.price));
        }
      });

      return temp;
    });
  }, [prices, keywords, timeFilter, units]);

  // const data = useMemo(() => {
  //   const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
  //     getStartDayDate(e)
  //   );

  //   const multiplier = getMutiplier(timeFilter);
  //   return parsedStartDay.map((element) => {
  //     let temp: any = { name: `${element.toDateString()}` };

  //     const retailerPrices = prices
  //       .filter((e: any) => {
  //         return (
  //           element.getTime() <=
  //             getStartDayDate(new Date(e.createdAt)).getTime() &&
  //           element.getTime() + 86399999 * multiplier >=
  //             getStartDayDate(new Date(e.createdAt)).getTime() &&
  //           e.type === "Retailer"
  //         );
  //       })
  //       .map((e: any) => e);

  //     keywords.forEach((keyword: string) => {
  // const priceTemp = retailerPrices.filter(
  //   (e: any) => e.item.name == keyword
  // );

  // temp[keyword] = 0;
  // if (priceTemp.length !== 0) {
  //   temp[keyword] = Math.max(...priceTemp.map((e: any) => e.price));
  // }
  //     });

  //     return temp;
  //   });
  // }, [prices, keywords, timeFilter, units]);
  return (
    <div className="bg-white-50 p-6 flex justify-center items-center flex-col gap-4 rounded-lg">
      <p className="text-2xl font-black">Customer Price Changes</p>
      <LineChart
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

export default PriceChangesChart;
