"use client";
import { Button } from "@/components";
import { post } from "@/config";
import { DISCOUNT } from "@/constants";
import { useWalkInStore } from "@/states";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

function ReceiptModal({ isOpen, setIsOpen }: any) {
  const walkInStore = useWalkInStore() as any;
  const router = useRouter();
  const total = useMemo(() => {
    const temp = walkInStore.items.reduce(
      (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
      0
    );
    return walkInStore.discounted ? temp * DISCOUNT : temp;
  }, [walkInStore.items, walkInStore.discounted]);

  const handleSubmit = async () => {
    let temp: any = {
      name: walkInStore.name,
      contactNumber: walkInStore.contactNumber,
      items: walkInStore.items,
      discountIdImage: walkInStore.discounted ? "" : null,
    };

    const { data } = await post("transactions", temp);

    if (data.status == "success") router.push("/");
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="fixed min-h-screen min-w-full z-30 bg-gray-500/50 flex justify-center ">
      <div className="min-h-screen bg-white-100 w-96 z-40 p-5">
        <div className="flex items-center justify-end">
          <p
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p>Customer: {walkInStore.name}</p>
          <p>Contact Number: {walkInStore.contactNumber}</p>
          <p>{walkInStore.discounted ? "Discounted" : "Not Discounted"}</p>
          {walkInStore.items.map((e: any) => {
            return (
              <div
                key={e._id}
                className="w-full flex item-center justify-between"
              >
                <p>
                  {e.quantity}X {e.name}
                </p>
                <p>{e.quantity * e.customerPrice} PHP</p>
              </div>
            );
          })}
        </div>

        <div className="w-full flex item-center justify-between">
          <p>Total</p>
          <p>{total} PHP</p>
        </div>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          <p>Confirm</p>
        </Button>
      </div>
    </div>
  );
}

export default ReceiptModal;
