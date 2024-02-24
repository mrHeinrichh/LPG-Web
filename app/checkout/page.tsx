"use client";
import { Sidenav, Button, InputField } from "@/components";
import { post } from "@/config";
import { DISCOUNT } from "@/constants";
import { useItemStore, useWalkInStore } from "@/states";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function WalkIn({}: any) {
  const { getItems, items } = useItemStore() as any;
  const walkInStore = useWalkInStore() as any;
  const router = useRouter();

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

    console.log(data);

    if (data.status == "success") router.push("/");
  };

  const total = useMemo(() => {
    const temp = walkInStore.items.reduce(
      (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
      0
    );
    return discounted ? temp * DISCOUNT : temp;
  }, [walkInStore.items, discounted]);

  useEffect(() => {
    getItems();
  }, [items]);

  return (
    <>
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
                <input type="checkbox" />
                <p>Discounted? </p>
              </label>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          <p>Complete Order</p>
        </Button>
      </Sidenav>
    </>
  );
}
