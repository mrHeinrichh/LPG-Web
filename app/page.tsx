"use client";
import { StatsCard, Sidenav, Button } from "@/components";
import {
  useCustomerStore,
  useDashboardStore,
  useTransactionStore,
} from "@/states";
import { useEffect, useMemo } from "react";

export default function Home() {
  const dashboardStore = useDashboardStore() as any;
  const { getCustomer, customers, toggleVerify } = useCustomerStore() as any;

  const unverified = useMemo(
    () => customers.filter((e: any) => !e.verified),
    [customers]
  );

  const pendingDeliveries = useMemo(
    () => dashboardStore.transactions.filter((e: any) => e.status == "Pending"),
    [dashboardStore.transactions]
  );

  const completedDeliveries = useMemo(
    () =>
      dashboardStore.transactions.filter((e: any) => e.status == "Completed"),
    [dashboardStore.transactions]
  );

  const total = useMemo(() => {
    console.log(completedDeliveries);

    return completedDeliveries.reduce(
      (acc: any, curr: any) => acc + curr.total,
      0
    );
  }, [completedDeliveries]);

  useEffect(() => {
    getCustomer();
    dashboardStore.getTransactionsByStatus(["Pending", "Completed"]);
  }, []);

  return (
    <main>
      <Sidenav>
        <div className="grid grid-cols-3 gap-2 w-full">
          <StatsCard title="Total Revenue Today" value={total} net={-0.0} />
          <StatsCard
            title="Pending Deliveries"
            value={pendingDeliveries.length}
            net={1.7}
          />
          <StatsCard
            title="Completed Deliveries"
            value={completedDeliveries.length}
            net={1.7}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2">
            {pendingDeliveries.map((e: any) => {
              return (
                <div key={e._id} className=" bg-slate-800 p-3 rounded">
                  <p className="text-white-100">{e.name}</p>
                  <p className="text-white-100">{e.status}</p>
                  <p className="text-white-100">Items: {e.items.length}</p>
                  <p className="text-white-100">Total: {e.total}PHP</p>
                  <Button
                    onClick={() => {
                      dashboardStore.updateStatus(e._id, "Approved");
                    }}
                  >
                    <p className="text-white-100">Approve</p>
                  </Button>
                  <Button
                    onClick={() => {
                      dashboardStore.updateStatus(e._id, "Declined");
                    }}
                  >
                    <p className="text-white-100">Decline</p>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2"></div>
      </Sidenav>
    </main>
  );
}
