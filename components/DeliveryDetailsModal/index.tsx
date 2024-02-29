"use client";
import { getDateToString } from "@/utils";
import React from "react";
import Image from "next/image";
import style from "./style.module.css";
import Button from "../Button";
import { useTransactionStore } from "@/states";
function DeliveryDetailsModal({ isOpen, setIsOpen, data }: any) {
  const { approve, decline } = useTransactionStore() as any;
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
          </div>
        </div>

        {data.status == "Pending" ? (
          <div className="w-full flex justify-between items-center">
            <Button
              onClick={() => {
                approve(data._id);
                setIsOpen(false);
              }}
            >
              <p>Approve</p>
            </Button>
            <Button
              onClick={() => {
                decline(data._id);
                setIsOpen(false);
              }}
            >
              <p>Decline</p>
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DeliveryDetailsModal;