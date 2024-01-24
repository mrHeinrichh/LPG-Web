"use client";
import { Button, Datatable, Sidenav } from "@/components";
import { remove } from "@/config";
import edit from "@/public/edit.svg";
import trash from "@/public/trash.svg";
import { useCustomerStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Customers({}: any) {
  const router = useRouter();

  const { getCustomer, customers, removeCustomer } = useCustomerStore() as any;

  const header: any[] = [
    "Name",
    "Contact Number",
    "Email",
    "Address",
    "Verified",
    "Discounted",
    "Action",
  ];

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>
      <Sidenav>
        <div className="flex justify-between items-center w-full">
          <h4>Customers</h4>
          <Button
            onClick={() => {
              router.push("/customers/add");
            }}
          >
            Create Customer
          </Button>
        </div>

        <Datatable header={header}>
          {customers.map((e: any) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.contactNumber}</td>
              <td>{e.email}</td>
              <td>{e.address}</td>
              <td>{e.verified ? "Verfied" : "Pending"}</td>
              <td>{e.discounted ? "Discounted" : "Not Discounted"}</td>
              <td className="flex justify-evenly">
                <div
                  onClick={() => {
                    router.push(`/customers/edit?id=${e._id}`);
                  }}
                >
                  <Image src={edit} alt={"edit"}></Image>
                </div>
                <div
                  onClick={() => {
                    removeCustomer(e._id);
                  }}
                >
                  <Image src={trash} alt={"trash"}></Image>
                </div>
              </td>
            </tr>
          ))}
        </Datatable>
      </Sidenav>
    </>
  );
}
