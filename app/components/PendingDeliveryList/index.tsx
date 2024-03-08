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
  const [cancelReasons, setCancelReasons] = useState<{ [key: string]: string }>({});
  const [showCancelReasonInput, setShowCancelReasonInput] = useState<{ [key: string]: boolean }>({});

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
                <p className="text-lg font-semibold">{e.contactNumber}</p>
                <p className="text-lg font-semibold">{e.deliveryLocation}</p>
                <p className="text-lg font-semibold">{e.houseLotBlk}</p>
                <p className="text-lg font-semibold">{e.barangay}</p>


                <p className="text-lg font-semibold">{e.paymentMethod}</p>

                <p className="text-lg font-semibold">{e.deliveryDate}</p>



                <p className="">{e.status}</p>

                <div className="flex flex-col">
                  {e.items.map((item: any) => (
                    <div key={item._id}>
                      <p className="text-sm">{item.name}</p>

                      <p className="text-xs">{item.category}</p>
                    </div>
                  ))}
                </div>

                <p className="">No. of Items: {e.items.length}</p>
                <p className="">₱ {e.total}</p>
              </div>

              <div className="flex flex-col items-center">
                {e.discountIdImage != null && (
                  <div className="flex flex-col items-center">
                    <p className="">Discounted</p>
                    <img src={e.discountIdImage} alt="Discount" className="w-56 h-56" />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      approve(e._id);
                    }}
                  >
                    <p className="">Approve</p>
                  </Button>
                  <div className="flex gap-2">
                    {showCancelReasonInput[e._id] && (
                      <input
                        type="text"
                        placeholder="Enter cancel reason"
                        value={cancelReasons[e._id] || ''}
                        onChange={(event) => {
                          const newCancelReasons = { ...cancelReasons, [e._id]: event.target.value };
                          setCancelReasons(newCancelReasons);
                        }}
                        className="border border-gray-300 p-2"
                      />
                    )}

                    <Button
                      onClick={() => {
                        // Toggle the visibility of the cancel reason input
                        setShowCancelReasonInput((prev) => ({ ...prev, [e._id]: !prev[e._id] }));

                        // If the cancel reason input is visible, decline the transaction
                        if (showCancelReasonInput[e._id]) {
                          decline(e._id, cancelReasons[e._id] || '');
                        }
                      }}
                    >
                      <p className="text-white-100">{showCancelReasonInput[e._id] ? 'Confirm' : 'Decline'}</p>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}




    </ApprovalsList>
  );
}
