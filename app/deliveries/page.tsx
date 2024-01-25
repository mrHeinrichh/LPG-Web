"use client";
import { Sidenav, Button } from "@/components";
import { useTransactionStore } from "@/states";
import { useEffect, useMemo } from "react";

export default function Transactions() {
  const { getTransactions, transactions, updateStatus } =
    useTransactionStore() as any;

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
    <>
      <Sidenav>
        <h4>Deliveries</h4>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <p>Pending</p>
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
          <div className="flex flex-col gap-2 w-1/2">
            <p>Approved</p>
            {approved.map((e: any) => {
              return (
                <div key={e._id} className=" bg-slate-800 p-3 rounded">
                  <p className="text-white-100">{e.name}</p>
                  <p className="text-white-100">{e.status}</p>
                  <p className="text-white-100">Items: {e.items.length}</p>
                  <p className="text-white-100">Total: {e.total}PHP</p>

                  <Button>
                    <p className="text-white-100">Approve</p>
                  </Button>
                  <Button>
                    <p className="text-white-100">Decline</p>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </Sidenav>
    </>
  );
}
