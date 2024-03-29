"use client";
import { Sidenav, Button, InputField } from "@/components";
import { DISCOUNT } from "@/constants";
import { useCheckoutStore, useWalkinStore } from "@/states";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ReceiptModal } from "./components";
import { ICartItemModel } from "@/models";
import { parseToFiat } from "@/utils";

export default function Checkout({}: any) {
  const { cartItems, increment, decrement, reset } = useWalkinStore();
  const {
    setFormData,
    setDiscounted,
    createSuccess,
    discounted,
    resetCheckout,
  } = useCheckoutStore();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };
  
  const handleCheckboxChange = (e: any) => {
    const isChecked = e.target.checked;
    console.log('Checkbox checked:', isChecked);
    setDiscounted(isChecked);
    console.log('Discounted:', discounted);
  };

  const discountedAmount = useMemo(() => {
    const temp = cartItems.reduce(
      (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
      0
    );
    const discountApplied = temp * DISCOUNT;
    return discountApplied;
  }, [cartItems]);
  
  
  const total = useMemo(() => {
    const temp = cartItems.reduce(
      (acc: any, curr: any) => acc + curr.customerPrice * curr.quantity,
      0
    );
    return temp;
  }, [cartItems]);

  useEffect(() => {
    if (createSuccess) {
      router.back();
      reset();
      resetCheckout();
    }
  }, [createSuccess]);

  return (
    <>
      <ReceiptModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sidenav>
        <div className="flex gap-2 ">
          <div className="w-1/2">
            {cartItems.map((e: ICartItemModel) => {
              return (
                <div className="" key={e._id}>
                  <div className="w-full flex item-center justify-between">
                    <p>
                      {e.quantity}X {e.name}
                    </p>
                    <p>{parseToFiat(e.quantity * e.customerPrice)}</p>
                  </div>{" "}
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
          </div>
          
          <div className="w-1/2">
            <InputField
              name="name"
              placeholder="Customer Name"
              onChange={handleChange}
            />
            <InputField
              name="contactNumber"
              placeholder="Mobile Number"
              onChange={handleChange}
            />
            <div className="w-full flex justify-end">
              <label className="flex items-center gap-2">
              <input
          type="checkbox"
          onChange={handleCheckboxChange}  
        />
                <p>Discounted? </p>
              </label>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
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
