"use client";
import {
  TableRow,
  Datatable,
  Sidenav,
  InputField,
  SelectField,
} from "@/components";
import { useTransactionStore } from "@/states";
import { useEffect, useState } from "react";
import trash from "@/public/trash.svg";
import Image from "next/image";
import { SEARCH_FILTERS, TABLE_HEADERS } from "./data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getSearchFilterQuery } from "@/utils";

export default function Transactions() {
  const { getTransactions, transactions, removeTransaction } =
    useTransactionStore() as any;
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(20);

  useEffect(() => {
    if (search != "") {
      getTransactions(
        page,
        limit,
        getSearchFilterQuery(SEARCH_FILTERS, search)
      );
    } else {
      getTransactions(page, limit);
    }
  }, [page, limit, search]);

  return (
    <>
      <Sidenav>
        <h4>Transactions</h4>
        <InputField
          name="search"
          onChange={(event: any) => {
            const { value } = event.target;
            setsearch(value);
          }}
        />
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
      </Sidenav>
    </>
  );
}
// deleteItem;
