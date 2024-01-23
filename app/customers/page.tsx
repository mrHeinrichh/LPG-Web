"use client";
import { Button, Datatable, Sidenav } from "@/components";
import trash from "@/public/trash.svg";
import { useCustomerStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Customers({}: any) {
  const router = useRouter();

  const { getCustomer, customers } = useCustomerStore() as any;

  const header: any[] = [
    "Name",
    "Contact Number",
    "Address",
    "Address",
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
          <h4>Items</h4>
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
              <td>{e.address}</td>
              <td>{e.verified ? "Verfied" : "Pending"}</td>
              <td>{e.discounted ? "Discounted" : "Not Discounted"}</td>
              <td>
                <Image src={trash} alt={"trash"}></Image>
              </td>
            </tr>
          ))}
        </Datatable>
      </Sidenav>
    </>
  );
}
