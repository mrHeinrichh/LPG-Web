import { ApprovalsList, Card, Button } from "@/components";
import { useTransactionStore } from "@/states";
import { useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PendingCustomerList() {
  const { getTransactions, transactions, approve, decline } =
    useTransactionStore() as any;
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(3);

  const pendings = useMemo(
    () => transactions.filter((e: any) => e.status == "Pending"),
    [transactions]
  );

  useEffect(() => {
    getTransactions(page, limit, `{"__t": "Delivery", "status": "Pending"}`);
  }, [page, limit]);

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            Pending Delivery Approvals ({pendings.length})
          </p>
          <div className="flex items-center gap-4 ">
            <div className="cursor-pointer">
              <FaChevronLeft
                onClick={() => {
                  setpage((prev: number) => prev - 1);
                }}
              />
            </div>

            <p>{page}</p>
            <div className="cursor-pointer">
              <FaChevronRight
                onClick={() => {
                  setpage((prev: number) => prev + 1);
                }}
              />
            </div>
          </div>
        </div>
      }
    >
      {pendings.map((e: any) => {
        return (
          <Card key={e._id}>
            <div className="flex justify-between items-center w-full p-2">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{e.name}</p>
                <p className="">{e.status}</p>
                <p className="">No. of Items: {e.items.length}</p>
                <p className="">₱ {e.total}.00</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    approve(e._id);
                  }}
                >
                  <p className="">Approve</p>
                </Button>
                <Button
                  onClick={() => {
                    decline(e._id);
                  }}
                >
                  <p className="text-white-100">Decline</p>
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </ApprovalsList>
  );
}
