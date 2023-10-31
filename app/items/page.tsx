import { TableRow, Datatable, Sidenav } from "@/components";
import { API_URL } from "@/env";
import trash from "@/public/trash.svg";
import Image from "next/image";

export async function getData() {
  const response = await fetch(`${API_URL}items`);
  const data = (await response.json()).data;
  console.log(data);

  return data;
}

export default async function Transactions({}: any) {
  const header: any[] = [
    "Name",
    "Category",
    "Weight",
    "Customer Price",
    "Retailer Price",
    "Type",
    "Action",
  ];

  const data = await getData();

  return (
    <>
      <Sidenav>
        <h4>Items</h4>
        <Datatable header={header}>
          {data.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.name}</td>
              <td>{e.category}</td>
              <td>{e.weight} LBS.</td>
              <td>{e.customerPrice} PHP</td>
              <td>{e.retailerPrice} PHP</td>
              <td>{e.type} </td>

              <td>
                <Image src={trash} alt={"trash"}></Image>
              </td>
            </TableRow>
          ))}
        </Datatable>
      </Sidenav>
    </>
  );
}
