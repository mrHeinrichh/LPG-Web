"use client";
import { TableRow, Datatable, Sidenav } from "@/components";
import { API_URL } from "@/env";
import trash from "@/public/trash.svg";
import { useItemStore } from "@/states";
import Image from "next/image";
import { useEffect } from "react";

export async function getData() {
  const response = await fetch(`${API_URL}items`);
  const data = (await response.json()).data;
  return data;
}

export default function Transactions({}: any) {
  const { items, getItems, removeItem } = useItemStore() as any;
  const header: any[] = [
    "Name",
    "Category",
    "Weight",
    "Customer Price",
    "Retailer Price",
    "Type",
    "Action",
  ];

  useEffect(() => {
    getItems();
  }, []);

  const deleteTodo = async (id: any) => {
    try {
      const response = await fetch(`${API_URL}items/${id}`, {
        method: "DELETE",
      });

      const { status } = await response.json();

      if (status == "success") removeItem(id);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <Sidenav>
        <h4>Items</h4>
        <Datatable header={header}>
          {items.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.name}</td>
              <td>{e.category}</td>
              <td>{e.weight} LBS.</td>
              <td>{e.customerPrice} PHP</td>
              <td>{e.retailerPrice} PHP</td>
              <td>{e.type} </td>
              <td>
                <div
                  onClick={() => {
                    deleteTodo(e._id);
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
