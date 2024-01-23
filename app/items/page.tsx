"use client";
import { TableRow, Datatable, Sidenav, Button } from "@/components";
import trash from "@/public/trash.svg";
import edit from "@/public/edit.svg";
import { useItemStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { remove } from "@/config";

export default function Transactions({}: any) {
  const { items, getItems, removeItem } = useItemStore() as any;
  const router = useRouter();
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

  const deleteItem = async (id: any) => {
    try {
      const { data } = await remove(`items/${id}`);
      if (data.status == "success") removeItem(id);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <Sidenav>
        <div className="flex justify-between items-center w-full">
          <h4>Items</h4>
          <Button
            onClick={() => {
              router.push("/items/add");
            }}
          >
            Create Items
          </Button>
        </div>

        <Datatable header={header}>
          {items.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.name}</td>
              <td>{e.category}</td>
              <td>{e.weight} kg</td>
              <td>₱{e.customerPrice}.00 </td>
              <td>₱{e.retailerPrice}.00 </td>
              <td>{e.type} </td>
              <td className="flex justify-evenly">
                <div
                  onClick={() => {
                    router.push(`/items/edit?id=${e._id}`);
                  }}
                >
                  <Image src={edit} alt={"edit"}></Image>
                </div>
                <div
                  onClick={() => {
                    deleteItem(e._id);
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
