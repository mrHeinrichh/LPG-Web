"use client";
import { Sidenav, InputField, Button } from "@/components";
import { useTransactionStore } from "@/states";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { get, patch, post } from "@/config";

export default function Transactions({}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState<any>({
    name: "",
    address: "",
    contactNumber: "",
    gcash: "",
    email: "",
  });

  const [image, setimage] = useState<null | string>(null);
  const [gcashQr, setgcashQr] = useState<null | string>(null);
  const [license, setlicense] = useState<null | string>(null);
  const [seminarCert, setseminarCert] = useState<null | string>(null);

  const { getRiderTransactions, transactions } = useTransactionStore() as any;

  useEffect(() => {
    fetchRider();
  });

  useEffect(() => {
    getRiderTransactions(id);
  }, [transactions, getRiderTransactions, id]);

  const fetchRider = async () => {
    try {
      const { data } = await get(
        `users?filter={"__t": "Rider", "_id": "${id}"}`
      );

      if (data.status === "success") {
        setFormData({
          name: data.data[0].name ?? "",
          address: data.data[0].address ?? "",
          contactNumber: data.data[0].contactNumber ?? "",
          gcash: data.data[0].gcash ?? 0,
          email: data.data[0].email ?? 0,
        });

        setimage(data.data[0].image ?? "");
        setgcashQr(data.data[0].gcashQr ?? "");
        setlicense(data.data[0].license ?? "");
        setseminarCert(data.data[0].seminarCert ?? "");
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
      const { data } = await patch(`users/${id}`, {
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
        <div className="flex flex-col gap-2 w-1/2">
          <p>Approved</p>
          {transactions.map((e: any) => {
            return (
              <div key={e._id} className=" bg-slate-800 p-3 rounded">
                <p className="text-white-100">{e.name}</p>
                <p className="text-white-100">{e.status}</p>
                <p className="text-white-100">Items: {e.items.length}</p>
                <p className="text-white-100">Total: {e.total}PHP</p>

                <Button>
                  <p className="text-white-100">Approve</p>
                </Button>
                <Button>
                  <p className="text-white-100">Decline</p>
                </Button>
              </div>
            );
          })}
        </div>
        <form className={style.form}>
          <div className="col-span-2">
            <h3 className="font-bold text-lg">Edit Rider Details</h3>
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
          </div>
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
          <InputField
            name="name"
            placeholder="Name"
            onChange={handleChange}
            defaultValue={formData.name}
          />
          <InputField
            name="contactNumber"
            placeholder="Contact Number: "
            onChange={handleChange}
            defaultValue={formData.contactNumber}
          />
          <InputField
            name="address"
            placeholder="Current Address"
            onChange={handleChange}
            defaultValue={formData.address}
          />
          <InputField
            name="gcash"
            placeholder="GCASH Number"
            onChange={handleChange}
            defaultValue={formData.gcash}
          />
          <InputField
            name="email"
            placeholder="Email"
            onChange={handleChange}
            defaultValue={formData.email}
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
