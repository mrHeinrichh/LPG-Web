"use client";
import { TableRow, Datatable, Sidenav, Button, InputField } from "@/components";
import trash from "@/public/trash.svg";
import edit from "@/public/edit.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAnnouncementStore } from "@/states";
import { DatatableFooter } from "../shared";
import { HEADERS } from "./data";
import { FaPlus } from "react-icons/fa";

export default function Announcements({}: any) {
  const {
    page,
    nextPage,
    previousPage,
    setLimit,
    limit,
    announcements,
    getAnnouncements,
    removeAnnouncement,
  } = useAnnouncementStore();
  const router = useRouter();

  // TODO: Add search filter
  const [search, setsearch] = useState("");

  useEffect(() => {
    getAnnouncements({ page, limit });
  }, [getAnnouncements, page, limit]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setsearch(value);
  };

  return (
    <>
      <Sidenav>
        <div className="flex justify-between items-center w-full">
          <h4>Announcements</h4>
        </div>
        <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
          <div className="">
            <InputField name="search" onChange={handleChange} />
          </div>
          <div className="rounded-lg bg-black-50 p-2">
            <FaPlus
              onClick={() => {
                router.push("/announcements/add");
              }}
            />
          </div>
        </div>
        <Datatable header={HEADERS}>
          {announcements.map((e: any) => (
            <TableRow key={e._id}>
              <td>
                <p>{e.text}</p>
              </td>
              <td>
                <p>{e.start}</p>
              </td>
              <td>
                <p>{e.end}</p>
              </td>
              <td className="flex justify-evenly">
                <div
                  onClick={() => {
                    router.push(`/announcements/edit?id=${e._id}`);
                  }}
                >
                  <Image src={edit} alt={"edit"}></Image>
                </div>
                <div
                  onClick={() => {
                    removeAnnouncement(e._id);
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
