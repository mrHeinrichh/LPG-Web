"use client";
import { Sidenav, InputField, Button } from "@/components";
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
    question: "",
    answer: "",
  });

  useEffect(() => {
    fetchFaqs();
  });

  const fetchFaqs = async () => {
    try {
      const { data } = await get(`faqs/${id}`);
      if (data.status === "success") {
        setFormData({
          question: data.data[0].question ?? "",
          answer: data.data[0].answer ?? "",
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
      const { data } = await patch(`faqs/${id}`, { image, ...formData });
      if (data.status === "success") router.push("/faqs");
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  return (
    <>
      <Sidenav>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className="col-span-2">
            <h3 className="font-bold text-lg">Edit FAQs Details</h3>
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
            name="question"
            placeholder="question"
            onChange={handleChange}
            defaultValue={formData.question}
          />

          <InputField
            name="answer"
            placeholder="answer"
            onChange={handleChange}
            defaultValue={formData.answer}
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
