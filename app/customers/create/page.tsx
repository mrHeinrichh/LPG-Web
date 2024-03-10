"use client";
import { Sidenav, InputField, Button } from "@/components";
import { useCreateCustomerStore } from "@/states";
import Image from "next/image";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateCustomer({}: any) {
  const router = useRouter();
  const {
    createFormData,
    setCreateFormData,
    uploadImage,
    image,
    createCustomer,
    reset,
    createSuccess,
  } = useCreateCustomerStore();

  useEffect(() => {
    if (createSuccess) {
      reset();
      router.back();
    }
  }, [createSuccess, router, reset]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  const handleUpload = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    uploadImage(form);
  };

  const handleSubmit = async () => {
    createCustomer({ ...createFormData, image: image ?? "" });
  };

  return (
    <>
      <Sidenav>
        <form className={style.form}>
          <div className="col-span-2">
            <h3 className="font-bold text-lg">Add Customer Details</h3>
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
          <InputField
            name="contactNumber"
            placeholder="Mobile Number"
            onChange={handleChange}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <InputField
            name="address"
            placeholder="Address"
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
