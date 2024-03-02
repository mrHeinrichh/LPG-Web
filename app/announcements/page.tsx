"use client";
import { TableRow, Datatable, Sidenav, Button, InputField } from "@/components";
import trash from "@/public/trash.svg";
import edit from "@/public/edit.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAnnouncementStore } from "@/states/announcement";
import { DatatableFooter } from "../shared";

export default function Announcements({}: any) {
  const { announcements, getAnnouncements, removeAnnouncement } =
    useAnnouncementStore();
  const router = useRouter();
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const header: any[] = ["Content", "Start", "End", "Action"];

  useEffect(() => {
    getAnnouncements({ page, limit });
  }, [getAnnouncements, page, limit]);

  const filtered = useMemo(() => {
    let temp: any[] = [];
    if (search != "") {
      announcements.forEach((e: any) => {
        if (e?.text?.includes(search)) {
          temp.push(e);
        }
      });
    }

    if (search == "") {
      temp = announcements;
    }

    return temp;
  }, [announcements, search]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setsearch(value);
  };

  return (
    <>
      <Sidenav>
        <div className="flex justify-between items-center w-full">
          <h4>Announcements</h4>
          <Button
            onClick={() => {
              router.push("/announcements/add");
            }}
          >
            Create Announcement
          </Button>
        </div>
        <InputField name="search" onChange={handleChange} />
        <Datatable header={header}>
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
            setpage((state) => state - 1);
          }}
          onRight={() => {
            setpage((state) => state + 1);
          }}
          onSetLimit={(value) => {
            setlimit(value);
          }}
        />
      </Sidenav>
    </>
  );
}
