"use client";
import { TableRow, Datatable, Sidenav, InputField } from "@/components";
import { useTransactionStore } from "@/states";
import { useEffect, useMemo, useState } from "react";
import trash from "@/public/trash.svg";
import Image from "next/image";
export default function Transactions() {
  const { getTransactions, transactions, removeTransaction } =
    useTransactionStore() as any;
  const [search, setsearch] = useState("");

  const header: any[] = [
    "Name",
    "Contact Number",
    "Type",
    "Total",
    "Rider",
    "Date Created",
    "Action",
  ];

  useEffect(() => {
    getTransactions();
  }, []);

  const filtered = useMemo(() => {
    let temp = [];
    if (search != "") {
      transactions.forEach((e: any) => {
        if (
          e.contactNumber.includes(search) ||
          e.name.includes(search) ||
          e.total.toString().includes(search)
        ) {
          temp.push(e);
        }
      });
    }

    if (search == "") {
      temp = transactions;
    }

    return temp;
  }, [transactions, search]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setsearch(value);
  };

  const deleteTransaction = async (id: any) => {
    removeTransaction(id);
  };
  return (
    <>
      <Sidenav>
        <h4>Transactions</h4>
        <InputField name="search" onChange={handleChange} />
        <Datatable header={header}>
          {filtered.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.name}</td>
              <td>{e.contactNumber}</td>
              <td>{e.__t ? `${e.__t}` : "Walk In"}</td>
              <td>₱{e.total.toFixed(2)}</td>
              <td>{e.rider}</td>
              <td>{e.createdAt}</td>
              <td className="flex justify-evenly"></td>{" "}
              <td className="flex justify-evenly">
                <div
                  onClick={() => {
                    deleteTransaction(e._id);
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
// deleteItem;
