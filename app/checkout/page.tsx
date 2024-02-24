"use client";
import { Sidenav, Button, InputField } from "@/components";
import { post } from "@/config";
import { DISCOUNT } from "@/constants";
import { useItemStore, useWalkInStore } from "@/states";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ReceiptModal } from "./components";

export default function WalkIn({}: any) {
  const walkInStore = useWalkInStore() as any;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: "",
    contactNumber: "",
  });
  const [discounted, setdiscounted] = useState<boolean>(false);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async () => {
    let temp: any = {
      ...formData,
      items: walkInStore.items,
    };

    if (discounted) {
      temp.discountIdImage = "";
    }

    const { data } = await post("transactions", temp);

    if (data.status == "success") router.push("/");
  };

  const total = useMemo(() => {
    const temp = walkInStore.items.reduce(
      (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
      0
    );
    return discounted ? temp * DISCOUNT : temp;
  }, [walkInStore.items, discounted]);

  return (
    <>
      <ReceiptModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sidenav>
        <div className="flex gap-2 ">
          <div className="w-1/2">
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
          </div>
          <div className="w-1/2">
            <InputField
              name="name"
              placeholder="Customer Name"
              onChange={handleChange}
            />
            <InputField
              name="contactNumber"
              placeholder="Contact Number"
              onChange={handleChange}
            />
            <div className="w-full flex justify-end">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onClick={(e: any) => {
                    setdiscounted(e.target.checked);
                  }}
                />
                <p>Discounted? </p>
              </label>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            walkInStore.setData(
              formData.name,
              formData.contactNumber,
              discounted
            );
            // handleSubmit();
            setIsOpen(true);
          }}
        >
          <p>Complete Order</p>
        </Button>
      </Sidenav>
    </>
  );
}
