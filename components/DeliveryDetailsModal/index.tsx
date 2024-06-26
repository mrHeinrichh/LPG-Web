"use client";
import { getDateToString } from "@/utils";
import React from "react";
import Image from "next/image";
import style from "./style.module.css";
import Button from "../Button";
import { useDeliveriesStore } from "@/states";

function DeliveryDetailsModal({ isOpen, setIsOpen, data }: any) {
  const { approve, decline } = useDeliveriesStore();
  const [cancelReason, setCancelReason] = React.useState<string>("");
  const [showCancelReasonInput, setShowCancelReasonInput] = React.useState<boolean>(false);

  if (!isOpen) {
    return <></>;
  }

  // Calculate discounted amount
  const discountedAmount = data.discountIdImage != null ? data.total * 0.2 : 0;
  // Calculate deducted amount from the total
  const deductedAmount = data.total - discountedAmount;

  return (
    <div className="fixed min-h-screen min-w-full z-30 bg-gray-500/50 flex justify-center items-center">
      <div className={style.card_container}>
        <div className="flex items-center justify-end">
          <p
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </p>
        </div>
        <div className="grid grid-cols-2 gap-20">
          <div className="flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <p>Ordered By: {data.to.name}</p>
              <div className="flex items-center gap-2">
                <p>
                  Receiver: {data.name} ({data.contactNumber})
                </p>
              </div>
            </div>

            <p>Delivery Date: {getDateToString(data.createdAt)}</p>
            <p>Payment Method: {data.paymentMethod}</p>

            <p>
              Location: {data.deliveryLocation} {data.houseLotBlk}
            </p>
            <p>Payment Method: {data.paymentMethod}</p>

            <p>
              {data.discountIdImage != null
                ? "Applying for Discount"
                : "Not applying for Discount"}
            </p>
            {data.discountIdImage != null ? (
              <div className="">
                <p>Discount ID</p>
                <Image
                  src={data.discountIdImage}
                  alt=""
                  height={300}
                  width={300}
                ></Image>
              </div>
            ) : (
              <></>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              {data.items.map((e: any) => {
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
              <p>{data.total} PHP</p>
            </div>
            {/* Display discounted amount and deducted amount */}
            <div className="w-full flex item-center justify-between">
              <p>Discounted Amount (20%): </p>
              <p>₱{discountedAmount}</p>
            </div>
            <div className="w-full flex item-center justify-between">
              <p>Deducted from Total: </p>
              <p>₱{deductedAmount}</p>
            </div>
          </div>
        </div>

        {data.status === "Pending" ? (
          <div className="w-full flex justify-between items-center">
            <Button
              onClick={() => {
                approve(data._id);
                setIsOpen(false);
              }}
            >
              <p>Approve</p>
            </Button>
            <div className="flex gap-4 items-center">
              <div>
                <input
                  type="text"
                  placeholder="Cancel Reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
            <Button
 onClick={async () => {
  try {
    await (decline as (id: string, cancelReason?: string) => Promise<void>)(data._id, cancelReason);
    setIsOpen(false);
  } catch (error) {
    console.error("Error while declining:", error);
    // Handle the error gracefully
  }
}}

>
  <p>Decline with Reason</p>
</Button>

              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DeliveryDetailsModal;
