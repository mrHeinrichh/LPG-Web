"use client";
import { Button, Datatable, InputField, Sidenav } from "@/components";
import edit from "@/public/edit.svg";
import trash from "@/public/trash.svg";
import { useCustomerStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Customers({}: any) {
  const router = useRouter();
  const [search, setsearch] = useState("");
  const { getCustomer, customers, removeCustomer, toggleVerify } =
    useCustomerStore() as any;

  const header: any[] = [
    "Name",
    "Contact Number",
    "Email",
    "Address",
    "Verified",
    "Discounted",
    "Action",
  ];

  const filters: any[] = ["name", "contactNumber", "email", "address"];

  const unverified = useMemo(
    () => customers.filter((e: any) => !e.verified),
    [customers]
  );

  const filtered = useMemo(() => {
    let temp = [];
    if (search != "") {
      customers.forEach((e: any) => {
        if (
          e.name.includes(search) ||
          e.address.includes(search) ||
          e.email.includes(search) ||
          e.contactNumber.includes(search)
        ) {
          temp.push(e);
        }
      });
    }

    if (search == "") {
      temp = customers;
    }
    return temp;
  }, [customers, search]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setsearch(value);
    // setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

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

        <InputField name="search" onChange={handleChange} />
        <Datatable header={header}>
          {filtered.map((e: any) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.contactNumber}</td>
              <td>{e.email}</td>
              <td>{e.address}</td>
              <td>{e.verified ? "Verified" : "Pending"}</td>
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
        <div className="flex flex-col gap-2 w-1/2">
          <p>Pending</p>
          {unverified.map((e: any) => {
            return (
              <div key={e._id} className=" bg-slate-800 p-3 rounded">
                <p className="text-white-100">{e.name}</p>

                <Button
                  onClick={() => {
                    toggleVerify(e._id, true);
                  }}
                >
                  <p className="text-white-100">Approve</p>
                </Button>
              </div>
            );
          })}
        </div>
      </Sidenav>
    </>
  );
}
