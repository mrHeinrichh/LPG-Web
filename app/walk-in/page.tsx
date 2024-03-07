"use client";
import { Sidenav, Button } from "@/components";
import { ICartItemModel, IItemModel } from "@/models";
import { useWalkInStore, useWalkinStore } from "@/states";
import { parseToFiat } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WalkIn({}: any) {
  const {
    getItems,
    brandNewTanks,
    refillTanks,
    accessories,
    increment,
    cartItems,
    decrement,
    total,
  } = useWalkinStore();
  const router = useRouter();

  useEffect(() => {
    getItems({});
  }, [getItems]);

  return (
    <>
      <Sidenav>
        <div className="flex gap-2 ">
          <div className="flex w-2/3 flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-bold">Brand New Tanks</p>
              <div className="flex items-center gap-4">
                {brandNewTanks.map((e: IItemModel) => {
                  return (
                    <div
                      className="w-fit h-fit"
                      key={e._id}
                      onClick={() => {
                        increment(e);
                      }}
                    >
                      <Image
                        src={e.image}
                        width={140}
                        height={140}
                        alt={e.image}
                      ></Image>
                      <p>{e.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Refill Tanks</p>
              <div className="flex items-center gap-4">
                {refillTanks.map((e: IItemModel) => {
                  return (
                    <div
                      className="w-fit h-fit"
                      key={e._id}
                      onClick={() => {
                        increment(e);
                      }}
                    >
                      <Image
                        src={e.image}
                        width={140}
                        height={140}
                        alt={e.image}
                      ></Image>
                      <p>{e.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Accessories</p>
              <div className="flex items-center gap-4">
                {accessories.map((e: IItemModel) => {
                  return (
                    <div
                      className="w-fit h-fit"
                      key={e._id}
                      onClick={() => {
                        increment(e);
                      }}
                    >
                      <Image
                        src={e.image}
                        width={140}
                        height={140}
                        alt={e.image}
                      ></Image>
                      <p>{e.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            {cartItems.map((e: ICartItemModel) => {
              return (
                <div className="" key={e._id}>
                  <div className="w-full flex item-center justify-between">
                    <p>
                      {e.name} ({e.quantity}X)
                    </p>
                    <p>{parseToFiat(e.quantity * e.customerPrice)} </p>
                  </div>
                  <div className="w-full flex item-center justify-end gap-2">
                    <Button
                      onClick={() => {
                        increment(e);
                      }}
                    >
                      <p>Add</p>
                    </Button>
                    <Button
                      onClick={() => {
                        decrement(e);
                      }}
                    >
                      <p>Deduct</p>
                    </Button>
                  </div>
                </div>
              );
            })}

            <div className="w-full flex item-center justify-between">
              <p>Total</p>
              <p>{parseToFiat(total)} </p>
            </div>

            <Button
              onClick={() => {
                router.push("checkout");
              }}
            >
              <p>Checkout</p>
            </Button>
          </div>
        </div>
      </Sidenav>
    </>
  );
}
