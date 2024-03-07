"use client";
import { TableRow, Datatable, Sidenav, Button, InputField } from "@/components";
import trash from "@/public/trash.svg";
import edit from "@/public/edit.svg";
import { useFaqStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DatatableFooter } from "../shared";
import { HEADERS } from "./data";
import { FaPlus } from "react-icons/fa";

export default function Faqs({}: any) {
  const {
    page,
    nextPage,
    previousPage,
    setLimit,
    limit,
    faqs,
    getFaqs,
    removeFaq,
  } = useFaqStore();
  const router = useRouter();

  // TODO: Add search filter
  const [search, setsearch] = useState("");

  useEffect(() => {
    getFaqs({ page, limit });
  }, [getFaqs, page, limit]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setsearch(value);
  };

  const deleteFaq = async (id: any) => {
    removeFaq(id);
  };

  return (
    <>
      <Sidenav>
        <div className="flex justify-between items-center w-full">
          <h4>FAQs</h4>
        </div>
        <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
          <div className="">
            <InputField name="search" onChange={handleChange} />
          </div>
          <div className="rounded-lg bg-black-50 p-2">
            <FaPlus
              onClick={() => {
                router.push("/faqs/add");
              }}
            />
          </div>
        </div>
        <Datatable header={HEADERS}>
          {faqs.map((e: any) => (
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
        <DatatableFooter
          page={page}
          onLeft={() => {
            previousPage();
          }}
          onRight={() => {
            nextPage();
          }}
          onSetLimit={(event) => {
            setLimit(Number(event.target.value));
          }}
        />
      </Sidenav>
    </>
  );
}
