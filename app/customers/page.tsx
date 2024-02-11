"use client";
import {
  SelectField,
  Button,
  Datatable,
  InputField,
  Sidenav,
} from "@/components";
import edit from "@/public/edit.svg";
import trash from "@/public/trash.svg";
import { useCustomerStore } from "@/states";
import { getSearchFilterQuery } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { SEARCH_FILTERS, TABLE_HEADERS } from "./data";
export default function Customers({}: any) {
  const router = useRouter();
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(20);
  const { getCustomer, customers, removeCustomer, toggleVerify } =
    useCustomerStore() as any;

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
  };

  useEffect(() => {
    if (search != "") {
      getCustomer(page, limit, getSearchFilterQuery(SEARCH_FILTERS, search));
    } else {
      getCustomer(page, limit);
    }
  }, [page, limit, search]);

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
                setpage((prev: number) => prev - 1);
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
