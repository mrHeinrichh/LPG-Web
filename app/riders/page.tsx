"use client";
import { TableRow, Datatable, Sidenav, Button } from "@/components";
import trash from "@/public/trash.svg";
import { useRiderStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import edit from "@/public/edit.svg";

export default function Customers({}: any) {
  const router = useRouter();

  const { riders, getRider, removeRider } = useRiderStore() as any;
  const header: any[] = [
    "Name",
    "Email",
    "Contact Number",
    "Address",
    "GCASH NO.",
    "Action",
  ];

  useEffect(() => {
    getRider();
    return () => {};
  }, [riders]);

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
        <Datatable header={header}>
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
      </Sidenav>
    </>
  );
}
