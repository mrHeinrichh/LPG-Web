"use client";
import React from "react";
import Card from "../Card";

function DeliveryCard({ data, onClick }: any) {
  // Calculate discounted amount
  const discountedAmount = data.discountIdImage != null ? data.total * 0.2 : 0;
  // Calculate deducted amount from the total
  const deductedAmount = data.total - discountedAmount;

  return (
    <Card onClick={onClick}>
      <div className="flex flex-col gap-4 p-3">
        <div className="flex flex-col">
          <p className="">Ordered By: {data.to.name}</p>
          <p className="font-light">
            {data.deliveryLocation} {data.houseLotBlk}
          </p>
          <p className="font-light">{data.createdAt}</p>
          {data.discountIdImage != null ? (
            <p className="">Discount</p>
          ) : (
            <p className="">Not applying for discount</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Items</p>
          <div className="flex flex-col gap-4 w-full">
            {data.items.map((e: any) => {
              return (
                <div
                  key={e._id}
                  className="w-full flex item-center justify-between"
                >
                  <p>
                    {e.name}({e.quantity})
                  </p>
                  <p>₱{e.quantity * e.customerPrice}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <p>Total: </p>
          <p className="">₱{data.total}</p>
        </div>

        {/* Display discounted amount and deducted amount */}
        <div className="flex w-full items-center justify-between">
          <p>Discounted Amount (20%): </p>
          <p className="">₱{discountedAmount}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p>Deducted from Total: </p>
          <p className="">₱{deductedAmount}</p>
        </div>
      </div>
    </Card>
  );
}

export default DeliveryCard;
