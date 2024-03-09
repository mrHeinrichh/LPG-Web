"use client";
import {
  TableRow,
  Datatable,
  Sidenav,
  InputField,
  SelectField,
  Card,
} from "@/components";
import trash from "@/public/trash.svg";
import edit from "@/public/edit.svg";
import { useItemStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { TABLE_HEADERS } from "./data";

export default function Items({}: any) {
  const {
    items,
    getItems,
    removeItem,
    page,
    limit,
    search,
    getOverallItems,
    products,
    accessories,
    setLimit,
    nextPage,
    previousPage,
    setSearch,
  } = useItemStore();
  const router = useRouter();

  useEffect(() => {
    // TODO: Add search
    getItems({ page, limit });
  }, [page, limit, search, getItems]);

  useEffect(() => {
    getOverallItems({});
  }, [getOverallItems]);

  return (
    <>
      <Sidenav>
        <div className="grid grid-cols-2 gap-2 w-full mb-4">
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Products</p>
              <p className="text-2xl">{products.length}</p>
            </div>
          </Card>{" "}
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Accesories</p>
              <p className="text-2xl">{accessories.length}</p>
            </div>
          </Card>
        </div>

        <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
          <div className="">
            <InputField
              name="search"
              onChange={(event: any) => {
                const { value } = event.target;
                setSearch(value);
              }}
            />
          </div>
          <div className="rounded-lg bg-black-50 p-2">
            <FaPlus
              onClick={() => {
                router.push("/items/create");
              }}
            />
          </div>
        </div>

        <Datatable header={TABLE_HEADERS}>
          {items.map((e: any) => {
            let color = "";
            if (e.stock <= 3 || e.stock >= 0) {
              color = "bg-red-600";
            }

            if (e.stock <= 6 || e.stock >= 4) {
              color = "bg-orange-600";
            }

            if (e.stock >= 7) {
              color = "";
            }

            return (
              <TableRow key={e._id}>
                <td>{e.name}</td>
                <td>{e.category}</td>
                <td className={`${color}`}>{e.stock ?? 0}</td>
                <td>{e.weight} kg</td>
                <td>₱{e.customerPrice} </td>
                <td>₱{e.retailerPrice} </td>
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
                      removeItem(e._id);
                    }}
                  >
                    <Image src={trash} alt={"trash"}></Image>
                  </div>
                </td>
              </TableRow>
            );
          })}
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
