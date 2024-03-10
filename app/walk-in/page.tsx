"use client";
import React, { useEffect, useState } from 'react';
import { Sidenav, Button } from "@/components";
import { ICartItemModel, IItemModel } from "@/models";
import { useWalkInStore, useWalkinStore } from "@/states";
import { parseToFiat } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from './style.module.css';

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

  const itemsPerPage = 5;

  // State for tracking the current page of each category
  const [brandNewTanksPage, setBrandNewTanksPage] = useState(0);
  const [refillTanksPage, setRefillTanksPage] = useState(0);
  const [accessoriesPage, setAccessoriesPage] = useState(0);

  // Function to render a specific page of items for each category
  const renderItems = (items: IItemModel[], onClick: (item: IItemModel) => void, currentPage: number, setPage: React.Dispatch<React.SetStateAction<number>>) => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return items.slice(startIndex, endIndex).map((e: IItemModel) => (
      <div className={styles.itemContainer} key={e._id} onClick={() => onClick(e)}>
        <div className= ' w-auto h-auto'>
          <Image
            src={e.image}
            width={190}
            height={140}
            alt={e.image}
          />
          <p className="p-2 text-base font-bold">{e.name}</p>
        </div>
      </div>
    ));
  };

  return (
    <Sidenav>
      <div className="flex gap-1">
        <div className="flex w-2/3 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Brand New Tanks</p>
            <div className="flex items-center gap-4">
              {renderItems(brandNewTanks, increment, brandNewTanksPage, setBrandNewTanksPage)}
            </div>
            {/*{'<'} and Next buttons for Brand New Tanks */}
            <div className="flex justify-between">
              <Button
                onClick={() => setBrandNewTanksPage(Math.max(brandNewTanksPage - 1, 0))}
                disabled={brandNewTanksPage === 0}
              >
               {'<'}
              </Button>
              <Button
                onClick={() => setBrandNewTanksPage(brandNewTanksPage + 1)}
                disabled={(brandNewTanksPage + 1) * itemsPerPage >= brandNewTanks.length}
              >
                {'>'}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">Refill Tanks</p>
            <div className="flex items-center gap-4">
              {renderItems(refillTanks, increment, refillTanksPage, setRefillTanksPage)}
            </div>
            {/*{'<'} and {'>'} buttons for Refill Tanks */}
            <div className="flex justify-between">
              <Button
                onClick={() => setRefillTanksPage(Math.max(refillTanksPage - 1, 0))}
                disabled={refillTanksPage === 0}
              >
               {'<'}
              </Button>
              <Button
                onClick={() => setRefillTanksPage(refillTanksPage + 1)}
                disabled={(refillTanksPage + 1) * itemsPerPage >= refillTanks.length}
              >
                {'>'}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">Accessories</p>
            <div className="flex items-center gap-4">
              {renderItems(accessories, increment, accessoriesPage, setAccessoriesPage)}
            </div>
            {/*{'<'} and {'>'} buttons for Accessories */}
            <div className="flex justify-between">
              <Button
                onClick={() => setAccessoriesPage(Math.max(accessoriesPage - 1, 0))}
                disabled={accessoriesPage === 0}
              >
               {'<'}
              </Button>
              <Button
                onClick={() => setAccessoriesPage(accessoriesPage + 1)}
                disabled={(accessoriesPage + 1) * itemsPerPage >= accessories.length}
              >
                {'>'}
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.itemContainer}>
          <div className="flex-grow">
            {cartItems.map((e: ICartItemModel) => (
              <div key={e._id} className="mb-4">
                <div className="w-full flex items-center justify-between">
                  <p>
                    {e.name} ({e.quantity}X)
                  </p>
                  <p>{parseToFiat(e.quantity * e.customerPrice)} </p>
                </div>
                <div className="w-full flex items-center justify-end gap-2">
                  <Button
                    onClick={() => {
                      increment(e);
                    }}
                  >
                    <p>+</p>
                  </Button>
                  <Button
                    onClick={() => {
                      decrement(e);
                    }}
                  >
                    <p>-</p>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-between pr-4 pl-4 pb-3 ">
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
  );
}
