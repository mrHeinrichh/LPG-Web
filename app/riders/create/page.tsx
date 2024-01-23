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
  const { items, getItems, removeItem } = useItemStore() as any;
  const [formData, setFormData] = useState<any>({
    name: "",
    category: "",
    description: "",
    weight: 0,
    quantity: 1,
    customerPrice: 0,
    retailerPrice: 0,
  });

  const [image, setimage] = useState<null | string>(null);
  const [gcashQr, setgcashQr] = useState<null | string>(null);
  const [license, setlicense] = useState<null | string>(null);
  const [seminarCert, setseminarCert] = useState<null | string>(null);

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

  const handleUploadGcash = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    const { data } = await post<FormData>("upload/image", form);
    if (data.status == "success") {
      setgcashQr(data.data[0]?.path ?? "");
    }
  };

  const handleUploadLicense = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    const { data } = await post<FormData>("upload/image", form);
    if (data.status == "success") {
      setlicense(data.data[0]?.path ?? "");
    }
  };

  const handleUploadSeminarCert = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    const { data } = await post<FormData>("upload/image", form);
    if (data.status == "success") {
      setseminarCert(data.data[0]?.path ?? "");
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await post(`users`, {
        ...formData,
        image,
        gcashQr,
        license,
        seminarCert,
        type: "Rider",
      });
      if (data.status === "success") {
        router.push("/riders");
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
            <h3 className="font-bold text-lg">Add Rider Details</h3>
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
          <div className="col-span-2">
            {gcashQr ? (
              <Image src={gcashQr} alt="No image" width={150} height={150} />
            ) : (
              <></>
            )}
            <InputField
              type="file"
              name="gcashQr"
              placeholder="GCASH QR"
              onChange={handleUploadGcash}
            />
          </div>
          <div className="col-span-2">
            {license ? (
              <Image src={license} alt="No image" width={150} height={150} />
            ) : (
              <></>
            )}
            <InputField
              type="file"
              name="license"
              placeholder="License Image"
              onChange={handleUploadLicense}
            />
          </div>{" "}
          <div className="col-span-2">
            {seminarCert ? (
              <Image
                src={seminarCert}
                alt="No image"
                width={150}
                height={150}
              />
            ) : (
              <></>
            )}
            <InputField
              type="file"
              name="seminarCert"
              placeholder="Seminar Certificate Image"
              onChange={handleUploadSeminarCert}
            />
          </div>
          <InputField name="name" placeholder="Name" onChange={handleChange} />
          <InputField
            name="contactNumber"
            placeholder="Contact Number: "
            onChange={handleChange}
          />
          <InputField
            name="address"
            placeholder="Current Address"
            onChange={handleChange}
          />
          <InputField
            name="gcash"
            placeholder="GCASH Number"
            onChange={handleChange}
          />
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
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
