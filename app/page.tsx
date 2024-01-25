"use client";
import { StatsCard, Sidenav, Button } from "@/components";
import { useCustomerStore, useTransactionStore } from "@/states";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { getTransactions, transactions, updateStatus } =
    useTransactionStore() as any;

  const { getCustomer, customers, toggleVerify } = useCustomerStore() as any;

  const unverified = useMemo(
    () => customers.filter((e: any) => !e.verified),
    [customers]
  );

  useEffect(() => {
    getCustomer();
  }, [customers]);
  const pendings = useMemo(
    () => transactions.filter((e: any) => e.status == "Pending"),
    [transactions]
  );
  const approved = useMemo(
    () => transactions.filter((e: any) => e.status == "Approved"),
    [transactions]
  );
  useEffect(() => {
    getTransactions();
  }, [transactions]);

  return (
    <main>
      <Sidenav>
        <div className="grid grid-cols-3 gap-4 w-full ">
          <StatsCard title="Total Income" value={9700} net={-1.7} />
          <StatsCard title="Total Income" value={9700} net={1.7} />
          <StatsCard title="Total Income" value={9700} net={1.7} />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/4">
            <p>Unverified Customers</p>
            {unverified.map((e: any) => {
              return (
                <div key={e._id} className=" bg-slate-800 p-3 rounded">
                  <p className="text-white-100">{e.name}</p>
                  <p className="text-white-100">{e.email}</p>

                  <Button
                    onClick={() => {
                      toggleVerify(e._id, true);
                    }}
                  >
                    <p className="text-white-100">Approve</p>
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <p>Pending Deliveries</p>
            {pendings.map((e: any) => {
              return (
                <div key={e._id} className=" bg-slate-800 p-3 rounded">
                  <p className="text-white-100">{e.name}</p>
                  <p className="text-white-100">{e.status}</p>
                  <p className="text-white-100">Items: {e.items.length}</p>
                  <p className="text-white-100">Total: {e.total}PHP</p>

                  <Button
                    onClick={() => {
                      updateStatus(e._id, "Approved");
                    }}
                  >
                    <p className="text-white-100">Approve</p>
                  </Button>
                  <Button
                    onClick={() => {
                      updateStatus(e._id, "Declined");
                    }}
                  >
                    <p className="text-white-100">Decline</p>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </Sidenav>
    </main>
  );
}
