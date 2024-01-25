"use client";
import {
  TableRow,
  Datatable,
  Sidenav,
  InputField,
  Button,
  SelectField,
} from "@/components";
import { API_URL } from "@/env";
import trash from "@/public/trash.svg";
import { useItemStore } from "@/states";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { post } from "@/config";
export default function Transactions({}: any) {
  const router = useRouter();

  const [formData, setFormData] = useState<any>({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    address: "",
    hasAppointment: false,
    verified: false,
    discounted: false,
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
      const { data } = await post(`users`, {
        ...formData,
        image,
        type: "Customer",
      });
      if (data.status === "success") {
        router.push("/customers");
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
            placeholder="Contact Number"
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
