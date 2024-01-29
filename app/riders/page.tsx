"use client";
import { TableRow, Datatable, Sidenav, Button, InputField } from "@/components";
import trash from "@/public/trash.svg";
import { useRiderStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import edit from "@/public/edit.svg";

export default function Customers({}: any) {
  const router = useRouter();
  const [search, setsearch] = useState("");
  const { riders, getRider, removeRider } = useRiderStore() as any;
  const header: any[] = [
    "Name",
    "Email",
    "Contact Number",
    "Address",
    "GCASH NO.",
    "Action",
  ];

  const filtered = useMemo(() => {
    let temp = [];
    if (search != "") {
      riders.forEach((e: any) => {
        if (
          e.name.includes(search) ||
          e.address.includes(search) ||
          e.email.includes(search) ||
          e.gcash.includes(search) ||
          e.contactNumber.includes(search)
        ) {
          temp.push(e);
        }
      });
    }

    if (search == "") {
      temp = riders;
    }

    return temp;
  }, [riders, search]);

  useEffect(() => {
    getRider();
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setsearch(value);
  };

  return (
    <>
      <Sidenav>
        <div className="flex justify-between items-center w-full">
          <h4>Riders</h4>
          <Button
            onClick={() => {
              router.push("/riders/create");
            }}
          >
            Create Rider
          </Button>
        </div>
        <InputField name="search" onChange={handleChange} />;
        <Datatable header={header}>
          {filtered.map((e: any) => (
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
      </Sidenav>
    </>
  );
}
