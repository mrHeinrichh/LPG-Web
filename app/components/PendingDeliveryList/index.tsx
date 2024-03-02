import { ApprovalsList, Card, Button } from "@/components";
import { useTransactionStore } from "@/states";
import { useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PendingDeliveryList() {
  const {
    getPendingDeliveries,
    pendingDeliveries,
    approve,
    decline,
    maxPendingDeliveries,
  } = useTransactionStore() as any;
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(3);

  const pendings = useMemo(
    () => pendingDeliveries.filter((e: any) => e.status == "Pending"),
    [pendingDeliveries]
  );

  useEffect(() => {
    getPendingDeliveries(page, limit);
  }, [page, limit, getPendingDeliveries]);

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            Pending Delivery Approvals ({maxPendingDeliveries})
          </p>
          <div className="flex items-center gap-4 ">
            <div className="cursor-pointer">
              <FaChevronLeft
                onClick={() => {
                  if (page > 1) setpage((prev: number) => prev - 1);
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
                <p className="">₱ {e.total}</p>
                {e.discountIdImage != null ? (
                  <p className="">Discounted</p>
                ) : (
                  <></>
                )}
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
