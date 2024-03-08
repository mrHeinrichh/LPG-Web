import { ApprovalsList, Card, Button } from "@/components";
import { usePendingCustomerListStore } from "@/states";
import { useEffect } from "react";
import Image from "next/image";

export default function PendingCustomerList() {
  const { getPendingCustomers, pendingCustomers, verifyCustomer } =
    usePendingCustomerListStore();

  useEffect(() => {
    getPendingCustomers({});
  }, [getPendingCustomers]);

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            Pending Customer Verification ({pendingCustomers.length ?? 0})
          </p>
        </div>
      }
    >
      {pendingCustomers.map((e: any) => {
        return (
          <Card key={e._id}>
            <div className="w-full flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <Image src={e.image} alt="" height={100} width={100} />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{e.name}</p>
                  <p className="">{e.email}</p>
                </div>
              </div>

              <Button
                onClick={() => {
                  verifyCustomer(e._id);
                }}
              >
                <p className="">Verify</p>
              </Button>
            </div>
          </Card>
        );
      })}
    </ApprovalsList>
  );
}
