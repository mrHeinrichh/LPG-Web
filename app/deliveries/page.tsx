"use client";
import { Sidenav } from "@/components";
import { useTransactionStore } from "@/states";
import { useEffect, useMemo } from "react";
import {
  ApprovedDeliveryList,
  OnGoingDeliveryList,
  PendingDeliveryList,
} from "./components";

export default function Transactions() {
  const { getTransactions, transactions } = useTransactionStore() as any;

  useEffect(() => {
    getTransactions(0, 0);
  }, []);

  const data = useMemo(
    () =>
      transactions.filter(
        (e: any) =>
          e.status == "Approved" ||
          e.status == "Pending" ||
          e.status == "On Going"
      ),
    [transactions]
  );

  return (
    <>
      <Sidenav>
        <p className="text-4xl font-bold">
          Deliveries <span className="font-light">({data.length})</span>
        </p>
        <div className="grid grid-cols-3 gap-2 w-full my-5">
          <PendingDeliveryList />
          <ApprovedDeliveryList />
          <OnGoingDeliveryList />
        </div>
      </Sidenav>
    </>
  );
}
