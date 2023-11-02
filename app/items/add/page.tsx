"use client";
import { TableRow, Datatable, Sidenav, InputField, Button } from "@/components";
import { API_URL } from "@/env";
import trash from "@/public/trash.svg";
import { useItemStore } from "@/states";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/navigation";

export default function Transactions({}: any) {
  const router = useRouter();

  const { items, getItems, removeItem } = useItemStore() as any;
  const [formData, setFormData] = useState<any>({
    name: "",
    category: "",
    description: "",
    weight: 0,
    quantity: 1,
    customerPrice: 0,
    retailerPrice: 0,
    image: "qwdqwd",
    type: "{Products}",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { data, status, message } = await response.json();
      console.log(message);

      if (status === "success") {
        router.push("/");
      }
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  return (
    <>
      <Sidenav>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className="col-span-2">
            <h3 className="font-bold text-lg">Add Item Details</h3>
          </div>
          <InputField name="name" placeholder="Name" onChange={handleChange} />
          <InputField
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />
          <InputField
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <InputField
            type="number"
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
          />
          <InputField
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
          />
          <InputField
            type="number"
            name="customerPrice"
            placeholder="Customer Price"
            onChange={handleChange}
          />
          <InputField
            type="number"
            name="retailerPrice"
            placeholder="Retailer Price"
            onChange={handleChange}
          />
          <InputField
            name="type"
            placeholder="Item Type"
            onChange={handleChange}
          />
          <div className="col-span-2">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Sidenav>
    </>
  );
}
