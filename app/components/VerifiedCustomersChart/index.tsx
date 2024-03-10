"use client";
import { LineGraph } from "@/components";
import { useHomeStore } from "@/states";
import { getDates, getMutiplier, getStartDayDate } from "@/utils";
import { useMemo } from "react";

function VerifiedCustomersChart() {
  const { verifiedCustomers, units, timeFilter } = useHomeStore();

  const parsedCustomers = useMemo(() => {
    const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
      getStartDayDate(e)
    );

    const multiplier = getMutiplier(timeFilter);
    return parsedStartDay.map((e: Date) => {
      const customersTemp = verifiedCustomers.filter((sold) => {
        return (
          e.getTime() <= getStartDayDate(new Date(sold.createdAt)).getTime() &&
          e.getTime() + 86399999 * multiplier >=
            getStartDayDate(new Date(sold.createdAt)).getTime()
        );
      });

      return {
        name: e.toDateString(),
        customers: customersTemp.length,
      };
    });
  }, [verifiedCustomers, units, timeFilter]);

  return (
    <>
      <LineGraph
        title="Verified Customers"
        data={parsedCustomers}
        keywords={["customers"]}
      />
    </>
  );
}

export default VerifiedCustomersChart;
