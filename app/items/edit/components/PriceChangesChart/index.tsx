import { SelectField, InputField } from "@/components";
import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { TIME_FILTERS } from "./data";
import { TimeFilter } from "@/interfaces";
import { usePriceStore } from "@/states";
import { getDates, getStartDayDate, getMutiplier } from "@/utils";
import { useSearchParams } from "next/navigation";

function PriceChangesChart() {
  const searchParams = useSearchParams();
  const [units, setunits] = useState(20);
  const { getPrices, prices } = usePriceStore() as any;
  const [timeFilter, settimeFilter] = useState<TimeFilter>("Daily");
  const id = searchParams.get("id");
  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
    getPrices(
      0,
      0,
      `{"$and": [{"createdAt": {"$gte": "${startDate.toISOString()}", "$lte": "${endDate.toISOString()}"}}, {"item": "${id}"}]}`
    );
  }, [timeFilter, units, id]);

  const data = useMemo(() => {
    let temp: any = [];

    const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
      getStartDayDate(e)
    );

    const multiplier = getMutiplier(timeFilter);
    let curentCustomerValue = 0;
    let curentRetailerValue = 0;
    parsedStartDay.forEach((element) => {
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
        .map((e: any) => e.price);

      const retailerPrices = prices
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

      curentCustomerValue =
        customerPrices.length == 0
          ? curentCustomerValue
          : Math.max(...customerPrices);

      curentRetailerValue =
        retailerPrices.length == 0
          ? curentRetailerValue
          : Math.max(...retailerPrices);

      temp.push({
        name: `${element.toDateString()}`,
        customer: curentCustomerValue,
        retailer: curentRetailerValue,
      });
    });

    return temp;
  }, [prices]);
  return (
    <div>
      <SelectField
        options={TIME_FILTERS}
        name={"Time Filter"}
        title={"Time Filter"}
        onChange={function (e: any): void {
          const { name, value } = e.target;
          settimeFilter(value);
        }}
      />
      <InputField
        type="number"
        placeholder="Units"
        value={units}
        onChange={function (e: any): void {
          const { name, value } = e.target;
          setunits(value);
        }}
      ></InputField>
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
        <Line
          type="monotone"
          dataKey="customer"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="retailer"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}

export default PriceChangesChart;
