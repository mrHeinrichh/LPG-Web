"use client";
import { Sidenav, InputField, Button } from "@/components";
import Image from "next/image";
import { useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { post } from "@/config";

export default function CreateAnnouncement({}: any) {
  const router = useRouter();

  const [formData, setFormData] = useState<any>({
    text: "",
    start: "",
    end: "",
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
      const { data } = await post(`announcements`, { ...formData, image });
      if (data.status === "success") router.push("/announcements");
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  return (
    <>
      <Sidenav>
        <form className={style.form}>
          <div className="col-span-2">
            <h3 className="font-bold text-lg">Add Announcements Details</h3>
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
          <InputField name="text" placeholder="Text" onChange={handleChange} />
          <InputField
            type="date"
            name="start"
            placeholder="Start Date"
            onChange={handleChange}
          />
          <InputField
            type="date"
            name="end"
            placeholder="End Date"
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
