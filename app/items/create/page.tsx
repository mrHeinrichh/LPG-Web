"use client";
import { Sidenav, InputField, Button, SelectField } from "@/components";
import Image from "next/image";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { useCreateItemStore } from "@/states";
import { useEffect } from "react";

export default function CreateItem({}: any) {
  const router = useRouter();
  const {
    setCreateFormData,
    createFormData,
    image,
    uploadImage,
    createItem,
    reset,
    createSuccess,
  } = useCreateItemStore();

  useEffect(() => {
    if (createSuccess) {
      reset();
      router.back();
    }
  }, [createSuccess, reset, router]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCreateFormData({
      ...createFormData,
      [name]: value,
    });
  };

  const handleUpload = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    uploadImage(form);
  };

  const handleSubmit = async () => {
    createItem({ ...createFormData, image: image ? image : "" });
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
