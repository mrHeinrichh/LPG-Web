"use client";
import { TableRow, Datatable, Sidenav, Button, InputField } from "@/components";
import trash from "@/public/trash.svg";
import edit from "@/public/edit.svg";
import { useItemStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { remove } from "@/config";

export default function Items({}: any) {
  const { items, getItems, removeItem } = useItemStore() as any;
  const router = useRouter();
  const [search, setsearch] = useState("");
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

  const filtered = useMemo(() => {
    let temp = [];
    if (search != "") {
      items.forEach((e: any) => {
        if (
          e.category.includes(search) ||
          e.name.includes(search) ||
          e.weight.toString().includes(search) ||
          e.retailerPrice.toString().includes(search) ||
          e.customerPrice.toString().includes(search) ||
          e.type.includes(search)
        ) {
          temp.push(e);
        }
      });
    }

    if (search == "") {
      temp = items;
    }

    return temp;
  }, [items, search]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setsearch(value);
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
        <InputField name="search" onChange={handleChange} />;
        <Datatable header={header}>
          {filtered.map((e: any) => (
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
