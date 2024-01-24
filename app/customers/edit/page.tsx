"use client";
import { Sidenav, InputField, Button, SelectField } from "@/components";
import { API_URL } from "@/env";
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
    quantity: 1,
    customerPrice: 0,
    retailerPrice: 0,
    type: "",
  });

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const { data } = await get(`users/${id}`);
      if (data.status === "success") {
        setFormData({
          name: data.data[0].name ?? "",
          contactNumber: data.data[0].contactNumber ?? "",
          email: data.data[0].email ?? "",
          address: data.data[0].address ?? 0,
          hasAppointment: data.data[0].hasAppointment ?? false,
          verified: data.data[0].verified ?? false,
          discounted: data.data[0].verified ?? false,
        });

        setimage(data.data[0].image ?? "");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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
      const { data } = await patch(`users/${id}`, { image, ...formData });
      if (data.status === "success") router.push("/customers");
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
            name="contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
            defaultValue={formData.contactNumber}
          />
          <InputField
            name="address"
            placeholder="Address"
            onChange={handleChange}
            defaultValue={formData.address}
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
