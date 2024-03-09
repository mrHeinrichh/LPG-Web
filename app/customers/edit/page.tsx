"use client";
import { Sidenav, InputField, Button } from "@/components";
import { useEffect } from "react";
import style from "./style.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEditCustomerStore } from "@/states";

export default function EditCustomer({}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const {
    image,
    editFormData,
    setEditFormData,
    getCustomerById,
    updateCustomer,
    uploadImage,
    editSuccess,
    reset,
  } = useEditCustomerStore();

  useEffect(() => {
    if (editSuccess) {
      reset();
      router.push("/customers");
    }
  }, [router, reset, editSuccess]);

  useEffect(() => {
    getCustomerById(id ?? "");
  }, [getCustomerById, id]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleUpload = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    uploadImage(form);
  };

  const handleSubmit = async () => {
    updateCustomer(id ?? "", { image: image ?? "", ...editFormData });
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
            defaultValue={editFormData.name}
          />

          <InputField
            name="contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
            defaultValue={editFormData.contactNumber}
          />
          <InputField
            name="address"
            placeholder="Address"
            onChange={handleChange}
            defaultValue={editFormData.address}
          />

          <div className="col-span-2">
            <Button type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </Sidenav>
    </>
  );
}
