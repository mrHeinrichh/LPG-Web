"use client";
import { Sidenav, InputField, Button } from "@/components";
import Image from "next/image";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { useCreateFaqStore } from "@/states";
import { useEffect } from "react";

export default function CreateFaqs({}: any) {
  const {
    createFormData,
    setCreateFormData,
    uploadImage,
    image,
    createFaq,
    createSuccess,
    reset,
  } = useCreateFaqStore();
  const router = useRouter();

  useEffect(() => {
    if (createSuccess) {
      reset();
      router.push("/faqs");
    }
  }, [reset, createSuccess]);

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
    createFaq({ ...createFormData, image: image ?? "" });
  };

  return (
    <>
      <Sidenav>
        <form className={style.form}>
          <div className="col-span-2">
            <h3 className="font-bold text-lg">Add FAQs Details</h3>
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
            name="answer"
            placeholder="Answer"
            onChange={handleChange}
          />
          <InputField
            name="question"
            placeholder="Question"
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
