"use client";
import { Sidenav, InputField, Button, SelectField } from "@/components";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { get, patch, post } from "@/config";
import Image from "next/image";

export default function Transactions({}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [image, setimage] = useState<null | string>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    category: "",
    description: "",
    weight: 0,
    stock: 1,
    type: "",
  });
  const [customerPrice, setcustomerPrice] = useState<number>(0);
  const [retailerPrice, setretailerPrice] = useState<number>(0);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const { data } = await get(`items/${id}`);
      console.log(data);

      if (data.status === "success") {
        setFormData({
          name: data.data[0].name ?? "",
          category: data.data[0].category ?? "",
          description: data.data[0].description ?? "",
          weight: data.data[0].weight.toString() ?? "0",
          stock: data.data[0].stock.toString() ?? "0",
          type: data.data[0].type ?? "",
        });
        setcustomerPrice(data.data[0].customerPrice.toString() ?? "0");
        setretailerPrice(data.data[0].retailerPrice.toString() ?? "0");
        setimage(data.data[0].image ?? "");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name == "customerPrice") {
      setcustomerPrice(value);
      return;
    }
    if (name == "retailerPrice") {
      setretailerPrice(value);
      return;
    }

    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const handleUpload = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    const { data } = await post<FormData>("upload/image", form);
    if (data.status == "success") {
      setimage(data.data[0]?.path ?? "");
    }
  };

  const handleCustomerPriceSubmit = async () => {
    try {
      const { data } = await patch(`items/${id}/price`, {
        type: "Customer",
        price: customerPrice,
      });
      if (data.status === "success") router.push("/items");
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  const handleRetailerPriceSubmit = async () => {
    try {
      const { data } = await patch(`items/${id}/price`, {
        type: "Retailer",
        price: retailerPrice,
      });
      if (data.status === "success") router.push("/items");
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await patch(`items/${id}`, { image, ...formData });
      if (data.status === "success") router.push("/items");
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
          <div className="col-span-2">
            {image ? (
              <Image src={image} alt="No image" width={150} height={150} />
            ) : (
              <></>
            )}
            <InputField
              type="file"
              name="image"
              placeholder="Image"
              onChange={handleUpload}
            />
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
            value={formData.weight}
          />
          <InputField
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            value={formData.stock}
          />
          <SelectField
            options={[
              { title: "Accessory", value: "Accessory" },
              { title: "Products", value: "Products" },
            ]}
            name="type"
            title="Item Type"
            defaultValue={formData.type}
            onChange={handleChange}
          />
          <div className="col-span-2 flex justify-end">
            <Button type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </div>

          <div className="col-span-2">
            <h3 className="font-bold text-lg">Item Prices</h3>
          </div>
          <div className="flex flex-col gap-2">
            <InputField
              type="number"
              name="customerPrice"
              placeholder="Customer Price"
              onChange={handleChange}
              value={customerPrice}
            />
            <Button type="button" onClick={handleCustomerPriceSubmit}>
              Update
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <InputField
              type="number"
              name="retailerPrice"
              placeholder="Retailer Price"
              onChange={handleChange}
              value={retailerPrice}
            />
            <Button type="button" onClick={handleRetailerPriceSubmit}>
              Update
            </Button>
          </div>
        </form>
      </Sidenav>
    </>
  );
}
