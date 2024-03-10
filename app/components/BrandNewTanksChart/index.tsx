"use client";
import { ITEM_CATEGORIES } from "@/constants";
import { useHomeStore } from "@/states";
import {
  filterTransactionsByBaranggay,
  filterTransactionsByTimeSpan,
  getDates,
  getKeywordsFromItems,
  getMutiplier,
  getStartDayDate,
  parseDatesToStartDay,
} from "@/utils";
import { useMemo } from "react";
import { BarGraph } from "@/components";

export default function BrandNewTanksChart() {
  const { soldTransactions, timeFilter, units, baranggay } = useHomeStore();

  const keywords = useMemo(
    () =>
      getKeywordsFromItems(soldTransactions, ITEM_CATEGORIES.BRAND_NEW_TANKS),
    [soldTransactions]
  );

  const data = useMemo(() => {
    const parsedStartDay = parseDatesToStartDay(getDates(timeFilter, units));
    const multiplier = getMutiplier(timeFilter);
    return parsedStartDay.map((e: Date) => {
      let temp: any = {};
      keywords.forEach((keyword: any) => {
        temp[keyword] = 0;
      });

      let transactionsTemp = filterTransactionsByTimeSpan(
        soldTransactions,
        e,
        multiplier
      );

      if (baranggay != "All") {
        transactionsTemp.filter((sold: any) => {
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
                item.category == ITEM_CATEGORIES.BRAND_NEW_TANKS
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
      <BarGraph data={data} title="Brand New Tanks Sales" keywords={keywords} />
    </>
  );
}
