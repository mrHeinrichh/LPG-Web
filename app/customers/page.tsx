"use client";
import {
  SelectField,
  Datatable,
  InputField,
  Sidenav,
  Card,
} from "@/components";
import edit from "@/public/edit.svg";
import trash from "@/public/trash.svg";
import { useCustomerStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import { TABLE_HEADERS } from "./data";

export default function Customers({}: any) {
  const router = useRouter();
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(20);
  const {
    getCustomers,
    customers,
    overallCustomers,
    removeCustomer,
    getOverallCustomers,
    verifiedCustomers,
  } = useCustomerStore();

  useEffect(() => {
    // TODO: Add search
    getCustomers({ page, limit });
  }, [page, limit, search, getCustomers]);

  useEffect(() => {
    getOverallCustomers({});
  }, [getOverallCustomers]);

  return (
    <>
      <Sidenav>
        <div className="grid grid-cols-2 gap-2 w-full mb-4">
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Overall Customers</p>
              <p className="text-2xl">{overallCustomers.length}</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Verified Customers</p>
              <p className="text-2xl">{verifiedCustomers.length}</p>
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
                router.push("/customers/create");
              }}
            />
          </div>
        </div>

        <Datatable header={TABLE_HEADERS}>
          {customers.map((e: any) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.contactNumber}</td>
              <td>{e.email}</td>
              <td>{e.address}</td>
              <td>{e.verified ? <FaCheck /> : <FaTimes />}</td>

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
