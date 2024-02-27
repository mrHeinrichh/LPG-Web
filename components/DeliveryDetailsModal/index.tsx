"use client";
import { getDateToString } from "@/utils";
import React from "react";
import Image from "next/image";
import style from "./style.module.css";
function DeliveryDetailsModal({ isOpen, setIsOpen, data }: any) {
  if (!isOpen) {
    return <></>;
  }

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
              <p>Ordered By: {data.name}</p>
              <p>Delivery Date: {getDateToString(data.createdAt)}</p>
            </div>
            <p>
              Location: {data.deliveryLocation} {data.houseLotBlk}
            </p>
            <p>
              {data.discountIdImage != null
                ? "Applying for Discount"
                : "Not applying for Discount"}
            </p>
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
            {data.discountIdImage != null ? (
              <Image src={data.discountIdImage} alt=""></Image>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* <Button>
          <p>Confirm</p>
        </Button> */}
      </div>
    </div>
  );
}

export default DeliveryDetailsModal;
