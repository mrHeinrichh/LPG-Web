"use client";
import { Button } from "@/components";
import { getDateToString } from "@/utils";
import React from "react";
import Image from "next/image";
function DeliveryDetailsModal({ isOpen, setIsOpen, data }: any) {
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
          <p>Ordered By: {data.name}</p>
          <p>
            Location: {data.deliveryLocation} {data.houseLotBlk}
          </p>
          <p>Delivery Date: {getDateToString(data.createdAt)}</p>
          <p>
            {data.discountIdImage != null
              ? "Applying for Discount"
              : "Not applying for Discount"}
          </p>

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
          {data.discountIdImage != null ? (
            <Image src={data.discountIdImage} alt=""></Image>
          ) : (
            <></>
          )}
        </div>

        {/* <Button>
          <p>Confirm</p>
        </Button> */}
      </div>
    </div>
  );
}

export default DeliveryDetailsModal;
