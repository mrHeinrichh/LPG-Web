"use client";
import { Sidenav, InputField, Button, SelectField } from "@/components";
import { useEffect } from "react";
import style from "./style.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { PriceChangesChart, PricesTable } from "./components";
import { useEditItemStore } from "@/states";

export default function EditItems({}: any) {
  const {
    getItemById,
    editFormData,
    uploadImage,
    setEditFormData,
    image,
    updateItem,
    editSuccess,
    reset,
    customerPrice,
    retailerPrice,
    setCustomerPriceFormData,
    editCustomerPriceFormData,
    editRetailerPriceFormData,
    setRetailerPriceData,
    updateItemRetailerPrice,
    updateItemCustomerPrice,
  } = useEditItemStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (editSuccess) {
      reset();
      router.back();
    }
  }, [editSuccess, reset, router]);

  useEffect(() => {
    getItemById(id ?? "");
  }, [getItemById, id]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name == "customerPrice" || name == "customerReason") {
      setCustomerPriceFormData({ ...editCustomerPriceFormData, [name]: value });
      return;
    } else if (name == "retailerPrice" || name == "retailerReason") {
      setRetailerPriceData({ ...editRetailerPriceFormData, [name]: value });
      return;
    } else {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const handleUpload = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    uploadImage(form);
  };

  const handleCustomerPriceSubmit = async () => {
    updateItemCustomerPrice(id ?? "", { ...editCustomerPriceFormData });
  };

  const handleRetailerPriceSubmit = async () => {
    updateItemRetailerPrice(id ?? "", { ...editRetailerPriceFormData });
  };

  const handleSubmit = async () => {
    updateItem(id ?? "", {
      image: image ?? "",
      ...editFormData,
    });
  };

  return (
    <>
      <Sidenav>
        <PriceChangesChart />
        <PricesTable />
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
            defaultValue={editFormData.name}
          />

          <SelectField
            options={[
              { title: "Brand New Tanks", value: "Brand New Tanks" },
              { title: "Refill Tanks", value: "Refill Tanks" },
              { title: "Accessories", value: "Accessories" },
            ]}
            name="category"
            title="Category"
            defaultValue={editFormData.category}
            onChange={handleChange}
          />
          <InputField
            name="description"
            placeholder="Description"
            onChange={handleChange}
            defaultValue={editFormData.description}
          />
          <InputField
            type="number"
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
            value={editFormData.weight}
          />
          <InputField
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            value={editFormData.stock}
          />

          <SelectField
            options={[
              { title: "Accessory", value: "Accessory" },
              { title: "Products", value: "Products" },
            ]}
            name="type"
            title="Item Type"
            defaultValue={editFormData.type}
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
          <div className="">
            <InputField
              name="customerPrice"
              placeholder="Customer Price"
              onChange={handleChange}
              defaultValue={customerPrice.toString()}
            />
            <InputField
              name="customerReason"
              placeholder="Reason"
              onChange={handleChange}
            />
            <Button type="button" onClick={handleCustomerPriceSubmit}>
              Submit
            </Button>
          </div>

          <div className="">
            <InputField
              name="retailerPrice"
              placeholder="Retailer Price"
              onChange={handleChange}
              defaultValue={retailerPrice.toString()}
            />
            <InputField
              name="retailerReason"
              placeholder="Reason"
              onChange={handleChange}
            />
            <Button type="button" onClick={handleRetailerPriceSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </Sidenav>
    </>
  );
}
