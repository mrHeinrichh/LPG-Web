"use client";
import { TableRow, Datatable, Sidenav, Button, InputField } from "@/components";
import trash from "@/public/trash.svg";
import edit from "@/public/edit.svg";
import { useFaqStore, useItemStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { remove } from "@/config";

export default function Faqs({}: any) {
  const { faqs, getFaqs, removeFaq } = useFaqStore() as any;
  const router = useRouter();
  const [search, setsearch] = useState("");
  const header: any[] = ["Question", "Answer", "Action"];

  useEffect(() => {
    getFaqs();
  });

  const deleteFaq = async (id: any) => {
    removeFaq(id);
  };

  const filtered = useMemo(() => {
    let temp = [];
    if (search != "") {
      faqs.forEach((e: any) => {
        if (e.question.includes(search) || e.answer.includes(search)) {
          temp.push(e);
        }
      });
    }

    if (search == "") {
      temp = faqs;
    }

    return temp;
  }, [faqs, search]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setsearch(value);
  };
  return (
    <>
      <Sidenav>
        <div className="flex justify-between items-center w-full">
          <h4>FAQs</h4>
          <Button
            onClick={() => {
              router.push("/faqs/add");
            }}
          >
            Create FAQS
          </Button>
        </div>
        <InputField name="search" onChange={handleChange} />;
        <Datatable header={header}>
          {filtered.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.question}</td>
              <td>{e.answer}</td>

              <td className="flex justify-evenly">
                <div
                  onClick={() => {
                    router.push(`/faqs/edit?id=${e._id}`);
                  }}
                >
                  <Image src={edit} alt={"edit"}></Image>
                </div>
                <div
                  onClick={() => {
                    deleteFaq(e._id);
                  }}
                >
                  <Image src={trash} alt={"trash"}></Image>
                </div>
              </td>
            </TableRow>
          ))}
        </Datatable>
      </Sidenav>
    </>
  );
}
