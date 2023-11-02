"use client";
import { Sidenav, InputField, Button } from "@/components";
import { API_URL } from "@/env";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function Transactions({}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState<any>({
    name: "",
    category: "",
    description: "",
    weight: 0,
    quantity: 1,
    customerPrice: 0,
    retailerPrice: 0,
    image: "",
    type: "",
  });

  useEffect(() => {
    const start = async () => {
      try {
        const response = await fetch(`${API_URL}items/${id}`);
        const { data, status } = await response.json();

        if (status === "success") {
          setFormData({
            name: data[0].name ?? "",
            category: data[0].category ?? "",
            description: data[0].description ?? "",
            weight: data[0].weight ?? 0,
            quantity: data[0].quantity ?? 0,
            customerPrice: data[0].customerPrice ?? 0,
            retailerPrice: data[0].retailerPrice ?? 0,
            image: data[0].image ?? "",
            type: data[0].type ?? "",
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    start();
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { status } = await response.json();

      if (status === "success") {
        router.push("/items");
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
            <h3 className="font-bold text-lg">Edit Item Details</h3>
          </div>
          <InputField
            name="name"
            placeholder="Name"
            onChange={handleChange}
            defaultValue={formData.name}
          />
          <InputField
            name="category"
            placeholder="Category"
            onChange={handleChange}
            defaultValue={formData.category}
          />
          <InputField
            name="description"
            placeholder="Description"
            onChange={handleChange}
            defaultValue={formData.description}
          />
          <InputField
            type="number"
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
            defaultValue={formData.weight}
          />
          <InputField
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            defaultValue={formData.quantity}
          />
          <InputField
            type="number"
            name="customerPrice"
            placeholder="Customer Price"
            onChange={handleChange}
            defaultValue={formData.customerPrice}
          />
          <InputField
            type="number"
            name="retailerPrice"
            placeholder="Retailer Price"
            onChange={handleChange}
            defaultValue={formData.retailerPrice}
          />
          <InputField
            name="type"
            placeholder="Item Type"
            onChange={handleChange}
            defaultValue={formData.type}
          />
          <div className="col-span-2">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Sidenav>
    </>
  );
}
