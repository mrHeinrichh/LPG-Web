"use client";
import { Sidenav, InputField, Button } from "@/components";
import Image from "next/image";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { useCreateAnnouncementStore } from "@/states";
import { useEffect } from "react";

export default function CreateAnnouncement() {
  const {
    createFormData,
    createSuccess,
    image,
    setCreateFormData,
    uploadImage,
    createAnnouncement,
    reset,
  } = useCreateAnnouncementStore();

  const router = useRouter();

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
    createAnnouncement({ ...createFormData, image: image ?? "" });
  };

  useEffect(() => {
    if (createSuccess) {
      router.back();
      reset();
    }
  }, [createSuccess]);

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
