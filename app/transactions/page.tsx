"use client";
import {
  TableRow,
  Datatable,
  Sidenav,
  InputField,
  SelectField,
  Card,
} from "@/components";
import { useTransactionStore } from "@/states";
import { useEffect, useState } from "react";
import trash from "@/public/trash.svg";
import Image from "next/image";
import { TABLE_HEADERS } from "./data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { parseToFiat } from "@/utils";

export default function Transactions() {
  const {
    getTransactions,
    transactions,
    removeTransaction,
    page,
    limit,
    getOverallTransactions,
    overallTransactions,
    setLimit,
    nextPage,
    previousPage,
  } = useTransactionStore();
  const [search, setsearch] = useState("");

  useEffect(() => {
    getOverallTransactions({});
  }, [getOverallTransactions]);

  useEffect(() => {
    // TODO: Add search
    getTransactions({ page, limit });
  }, [page, limit, search, getTransactions]);

  return (
    <>
      <Sidenav>
        <div className="grid grid-cols-2 gap-2 w-full mb-4">
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Overall Transactions</p>
              <p className="text-2xl">{overallTransactions.length}</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Total Revenue</p>
              <p className="text-2xl">
                {parseToFiat(
                  overallTransactions.reduce((acc, curr) => curr.total + acc, 0)
                )}
              </p>
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
        </div>

        <Datatable header={TABLE_HEADERS}>
          {transactions.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.name}</td>
              <td>{e.contactNumber}</td>
              <td>{e.__t ? `${e.__t}` : "Walk In"}</td>
              <td>₱ {e.total.toFixed(2)}</td>
              <td>{e.createdAt}</td>
              <td className="flex justify-evenly"></td>{" "}
              <td className="flex justify-evenly">
                <div
                  onClick={() => {
                    removeTransaction(e._id);
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
                setLimit(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex items-center gap-4 ">
            <FaChevronLeft
              onClick={() => {
                previousPage();
              }}
            />
            {page}
            <FaChevronRight
              onClick={() => {
                nextPage();
              }}
            />
          </div>
        </div>
      </Sidenav>
    </>
  );
}
