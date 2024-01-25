"use client";
import { Sidenav, Button } from "@/components";
import { useItemStore, useWalkInStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function WalkIn({}: any) {
  const { getItems, items } = useItemStore() as any;
  const walkInStore = useWalkInStore() as any;
  const router = useRouter();
  const total = useMemo(
    () =>
      walkInStore.items.reduce(
        (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
        0
      ),
    [walkInStore.items]
  );

  useEffect(() => {
    getItems();
  }, [items]);

  return (
    <>
      <Sidenav>
        <div className="flex gap-2 ">
          <div className="flex w-2/3 flex-wrap gap-4 justify-between h-fit">
            {items.map((e: any) => {
              return (
                <div
                  className="w-fit h-fit"
                  key={e._id}
                  onClick={() => {
                    walkInStore.increment(e);
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
          <div className="w-1/3">
            {walkInStore.items.map((e: any) => {
              return (
                <div className="" key={e._id}>
                  <div className="w-full flex item-center justify-between">
                    <p>
                      {e.quantity}X {e.name}
                    </p>
                    <p>{e.quantity * e.customerPrice} PHP</p>
                  </div>{" "}
                  <div className="w-full flex item-center justify-end gap-2">
                    <Button
                      onClick={() => {
                        walkInStore.increment(e);
                      }}
                    >
                      <p>Add</p>
                    </Button>
                    <Button
                      onClick={() => {
                        walkInStore.decrement(e);
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
              <p>{total} PHP</p>
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