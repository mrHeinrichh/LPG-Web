"use client";
import { BarGraph } from "@/components";
import { useHomeStore } from "@/states";
import { getDates, getMutiplier, getStartDayDate } from "@/utils";
import { useMemo } from "react";

function TransactionTypeChart() {
  const { transactionTypes, units, timeFilter } = useHomeStore();

  const data = useMemo(() => {
    const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
      getStartDayDate(e)
    );

    const multiplier = getMutiplier(timeFilter);
    return parsedStartDay.map((e: Date) => {
      const temp = transactionTypes.filter((sold) => {
        return (
          e.getTime() <= getStartDayDate(new Date(sold.createdAt)).getTime() &&
          e.getTime() + 86399999 * multiplier >=
            getStartDayDate(new Date(sold.createdAt)).getTime()
        );
      });

      const walkin = temp.filter((transaction) => transaction.__t == null);
      const delivery = temp.filter(
        (transaction) => transaction.__t == "Delivery"
      );

      return {
        name: e.toDateString(),
        walkin: walkin.length,
        delivery: delivery.length,
      };
    });
  }, [transactionTypes, units, timeFilter]);

  return (
    <>
      <BarGraph
        title="Walkin and Delivery Orders"
        data={data}
        keywords={["walkin", "delivery"]}
      />
    </>
  );
}

export default TransactionTypeChart;
