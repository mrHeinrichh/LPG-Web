"use client";
import { Button } from "@/components";
import { DISCOUNT } from "@/constants";
import { useCheckoutStore, useWalkInStore, useWalkinStore } from "@/states";
import React, { useMemo, useEffect } from "react";

function ReceiptModal({ isOpen, setIsOpen }: any) {
  const walkInStore = useWalkInStore() as any;
  const { createTransaction, name, contactNumber, discounted } =
    useCheckoutStore();
  const { cartItems } = useWalkinStore();


  const handleSubmit = async () => {
    createTransaction({
      name,
      contactNumber,
      items: cartItems,
      discounted,
    });
  };
  const discountedAmount = useMemo(() => {
    const temp = cartItems.reduce(
      (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
      0
    );
    const discountApplied = temp * DISCOUNT;
    return discountApplied;
  }, [cartItems]);
  
  const total = useMemo(() => {
    const temp = cartItems.reduce(
      (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
      0
    );
    return temp;
  }, [cartItems]);
  
  const deductedAmount = total - discountedAmount;

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
          <p>Customer: {name}</p>
          <p>Contact Number: {contactNumber}</p>
          <p>{discounted ? "Discounted" : "Not Discounted"}</p>

          {cartItems.map((e) => {
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
        <br />
        <div className="w-full flex item-center justify-between">
          <p>Discounted Amount (20%):</p>
          <p> {discountedAmount} PHP</p>
        </div>
        <div className="w-full flex item-center justify-between">
          <p>Deducted from Total:</p>
          <p> {deductedAmount} PHP</p>
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
