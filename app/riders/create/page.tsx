"use client";
import { Sidenav, InputField, Button } from "@/components";
import { useCreateRiderStore } from "@/states";
import Image from "next/image";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateRider({}: any) {
  const router = useRouter();
  const {
    uploadImage,
    uploadGcash,
    uploadLicense,
    uploadSeminarCert,
    image,
    gcashQr,
    license,
    seminarCert,
    setCreateFormData,
    createFormData,
    createRider,
    createSuccess,
    reset,
  } = useCreateRiderStore();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  useEffect(() => {
    if (createSuccess) {
      router.push("/riders");
      reset();
    }
  }, [createSuccess, reset]);

  const handleUpload = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    uploadImage(form);
  };

  const handleUploadGcash = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    uploadGcash(form);
  };

  const handleUploadLicense = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    uploadLicense(form);
  };

  const handleUploadSeminarCert = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    uploadSeminarCert(form);
  };

  const handleSubmit = async () => {
    createRider({
      ...createFormData,
      image: image ?? "",
      gcashQr: gcashQr ?? "",
      license: license ?? "",
      seminarCert: seminarCert ?? "",
    });
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
            placeholder="Mobile Number: "
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
