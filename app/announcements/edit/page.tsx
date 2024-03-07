"use client";
import { Sidenav, InputField, Button } from "@/components";
import { useEffect } from "react";
import style from "./style.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEditAnnouncement } from "@/states";

export default function EditAnnouncement({}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    getAnnouncementById,
    uploadImage,
    image,
    setEditFormData,
    editFormData,
    updateAnnouncement,
    editSuccess,
    reset,
  } = useEditAnnouncement();

  useEffect(() => {
    if (id) getAnnouncementById(id ?? "");
  }, [getAnnouncementById, id]);

  useEffect(() => {
    if (editSuccess) {
      reset();
      router.push("/announcements");
    }
  }, [editSuccess, reset]);

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
    updateAnnouncement(id ?? "", { ...editFormData, image: image ?? "" });
  };

  return (
    <>
      <Sidenav>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className="col-span-2">
            <h3 className="font-bold text-lg">Edit Announcments</h3>
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
            name="text"
            placeholder="Text"
            onChange={handleChange}
            defaultValue={editFormData.text}
          />
          <InputField
            type="date"
            name="start"
            placeholder="Start Date"
            onChange={handleChange}
            value={editFormData.start}
          />
          <InputField
            type="date"
            name="end"
            placeholder="End Date"
            onChange={handleChange}
            value={editFormData.end}
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
