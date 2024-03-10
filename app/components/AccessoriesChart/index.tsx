"use client";
import { ITEM_CATEGORIES } from "@/constants";
import { useHomeStore } from "@/states";
import {
  getDates,
  getKeywordsFromItems,
  getMutiplier,
  getStartDayDate,
} from "@/utils";
import { useMemo } from "react";
import { BarGraph } from "@/components";

export default function AccessoriesChart() {
  const { soldTransactions, timeFilter, units, baranggay } = useHomeStore();

  const keywords = useMemo(
    () => getKeywordsFromItems(soldTransactions, ITEM_CATEGORIES.ACCESSORIES),
    [soldTransactions]
  );

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

      let transactionsTemp = soldTransactions.filter((sold: any) => {
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
                item.category == ITEM_CATEGORIES.ACCESSORIES
            ).length;
        });
      });

      return {
        name: e.toDateString(),
        ...temp,
      };
    });
  }, [soldTransactions, timeFilter, units, baranggay, keywords]);

  return (
    <>
      <BarGraph data={data} title="Accessories Sales" keywords={keywords} />
    </>
  );
}
