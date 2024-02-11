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
    ></ApprovalsList>
  );
}
