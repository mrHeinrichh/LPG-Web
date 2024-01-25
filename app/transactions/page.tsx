"use client";
import { TableRow, Datatable, Sidenav } from "@/components";
import { useTransactionStore } from "@/states";
import { useEffect } from "react";

export default function Transactions() {
  const { getTransactions, transactions } = useTransactionStore() as any;
  const header: any[] = ["Name", "Contact Number", "Walk In", "Action"];

  useEffect(() => {
    getTransactions();
  }, [transactions]);

  return (
    <>
      <Sidenav>
        <h4>Transactions</h4>
        <Datatable header={header}>
          {transactions.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.name}</td>
              <td>{e.contactNumber}</td>
              <td>{e.__t ? `${e.__t}` : "Walk In"}</td>
              <td className="flex justify-evenly"></td>
            </TableRow>
          ))}
        </Datatable>
      </Sidenav>
    </>
  );
}
