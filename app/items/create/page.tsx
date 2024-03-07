"use client";
import {
  TableRow,
  Datatable,
  Sidenav,
  InputField,
  Button,
  SelectField,
} from "@/components";
import Image from "next/image";
import { useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { post } from "@/config";
export default function Transactions({}: any) {
  const router = useRouter();

  const [formData, setFormData] = useState<any>({
    name: "",
    category: "",
    description: "",
    weight: 0,
    stock: 1,
    customerPrice: 0,
    retailerPrice: 0,
  });

  const [image, setimage] = useState<null | string>(null);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
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

  const handleSubmit = async () => {
    try {
      const { data } = await post(`items`, { ...formData, image });
      if (data.status === "success") {
        router.push("/");
      }
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  return (
    <>
      <Sidenav>
        <form className={style.form}>
          <div className="col-span-2">
            <h3 className="font-bold text-lg">Add Item Details</h3>
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

          <InputField name="name" placeholder="Name" onChange={handleChange} />
          <SelectField
            options={[
              { title: "Brand New Tanks", value: "Brand New Tanks" },
              { title: "Refill Tanks", value: "Refill Tanks" },
              { title: "Accessories", value: "Accessories" },
            ]}
            name="category"
            title="Category"
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
            name="stock"
            placeholder="Stock"
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
          <SelectField
            options={[
              { title: "Accessory", value: "Accessory" },
              { title: "Product", value: "Product" },
            ]}
            name="type"
            title="Item Type"
            onChange={handleChange}
          />
          <div className="col-span-2">
            <Button
              type="button"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Sidenav>
    </>
  );
}