"use client";
import {
  TableRow,
  Datatable,
  Sidenav,
  InputField,
  SelectField,
  Card,
} from "@/components";
import trash from "@/public/trash.svg";
import { useRiderStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import edit from "@/public/edit.svg";
import { SEARCH_FILTERS, TABLE_HEADERS } from "./data";
import { getSearchFilterQuery } from "@/utils";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";

export default function Customers({}: any) {
  const router = useRouter();
  const { riders, getRider, removeRider } = useRiderStore() as any;

  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(20);

  useEffect(() => {
    if (search != "") {
      getRider(page, limit, getSearchFilterQuery(SEARCH_FILTERS, search));
    } else {
      getRider(page, limit);
    }
  }, [page, limit, search, getRider]);

  return (
    <>
      <Sidenav>
        <div className="grid grid-cols-2 gap-2 w-full mb-4">
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Overall Riders</p>
              <p className="text-2xl">{1}</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Riders Available</p>
              <p className="text-2xl">1</p>
            </div>
          </Card>
        </div>
        <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
          <div className="">
            <InputField
              name="search"
              onChange={(event: any) => {
                const { value } = event.target;
                setsearch(value);
              }}
            />
          </div>
          <div className="rounded-lg bg-black-50 p-2">
            <FaPlus
              onClick={() => {
                router.push("/riders/create");
              }}
            />
          </div>
        </div>

        <Datatable header={TABLE_HEADERS}>
          {riders.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.contactNumber}</td>
              <td>{e.address}</td>
              <td>{e.gcash}</td>
              <td className="flex justify-evenly">
                <div
                  onClick={() => {
                    router.push(`/riders/edit?id=${e._id}`);
                  }}
                >
                  <Image src={edit} alt={"edit"}></Image>
                </div>
                <div
                  onClick={() => {
                    removeRider(e._id);
                  }}
                >
                  <Image src={trash} alt={"trash"}></Image>
                </div>
              </td>
            </TableRow>
          ))}
        </Datatable>
        <div className="w-full flex justify-between py-2">
          <div className="flex items-center gap-4 ">
            <SelectField
              options={[
                { title: "20", value: 20 },
                { title: "10", value: 10 },
                { title: "5", value: 5 },
                { title: "1", value: 1 },
              ]}
              name={""}
              title={""}
              onChange={(e: any) => {
                setlimit(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-4 ">
            <FaChevronLeft
              onClick={() => {
                if (page > 1) setpage((prev: number) => prev - 1);
              }}
            />
            {page}
            <FaChevronRight
              onClick={() => {
                setpage((prev: number) => prev + 1);
              }}
            />
          </div>
        </div>
      </Sidenav>
    </>
  );
}
