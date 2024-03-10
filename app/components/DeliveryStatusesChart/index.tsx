"use client";
import { LineGraph } from "@/components";
import { IDeliveryModel } from "@/models";
import { useHomeStore } from "@/states";
import { getDates, getMutiplier, getStartDayDate } from "@/utils";
import { useMemo } from "react";

function DeliveryStatusesChart() {
  const { orderAccomplishments, units, timeFilter, baranggay } = useHomeStore();

  const data = useMemo(() => {
    const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
      getStartDayDate(e)
    );
    const multiplier = getMutiplier(timeFilter);
    return parsedStartDay.map((e: Date) => {
      let transactionsTemp = orderAccomplishments.filter((sold) => {
        return (
          e.getTime() <= getStartDayDate(new Date(sold.createdAt)).getTime() &&
          e.getTime() + 86399999 * multiplier >=
            getStartDayDate(new Date(sold.createdAt)).getTime()
        );
      });
      if (baranggay != "All") {
        transactionsTemp = transactionsTemp.filter((transaction) => {
          return transaction.barangay == baranggay;
        });
      }
      const completed = transactionsTemp.reduce(
        (acc: any, curr: IDeliveryModel) => {
          return curr.status == "Completed" ? acc + 1 : acc;
        },
        0
      );

      const declined = transactionsTemp.reduce(
        (acc: any, curr: IDeliveryModel) => {
          return curr.status == "Declined" ? acc + 1 : acc;
        },
        0
      );

      const cancelled = transactionsTemp.reduce(
        (acc: any, curr: IDeliveryModel) => {
          return curr.status == "Cancelled" ? acc + 1 : acc;
        },
        0
      );

      return {
        name: e.toDateString(),
        completed,
        declined,
        cancelled,
      };
    });
  }, [orderAccomplishments, units, timeFilter, baranggay]);

  return (
    <>
      <LineGraph
        title="Orders Accomplishments"
        data={data}
        keywords={["completed", "cancelled", "declined"]}
      />
    </>
  );
}

export default DeliveryStatusesChart;
