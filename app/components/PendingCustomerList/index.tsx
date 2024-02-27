import { ApprovalsList, Card, Button } from "@/components";
import { useCustomerStore } from "@/states";
import { useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

export default function PendingCustomerList() {
  const { getCustomer, customers, verifyCustomer } = useCustomerStore() as any;
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(3);

  useEffect(() => {
    getCustomer(page, limit, `{"verified": false}`);
  }, [page, limit]);

  const pendings = useMemo(
    () => customers.filter((e: any) => e.verified == false),
    [customers]
  );

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            Pending Customer Verification ({pendings.length})
          </p>
          <div className="flex items-center gap-4 ">
            <div className="cursor-pointer">
              <FaChevronLeft
                onClick={() => {
                  if (page > 0)
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
