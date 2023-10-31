import { TableRow, Datatable, Sidenav } from "@/components";
import { API_URL } from "@/env";
import trash from "@/public/trash.svg";
import Image from "next/image";

export async function getUsers() {
  const response = await fetch(`${API_URL}users?filter={"__t": "Customer"}`);
  const data = (await response.json()).data;
  return data;
}

export default async function Transactions({}: any) {
  const header: any[] = [
    "Name",
    "Contact Number",
    "Address",
    "Address",
    "Discounted",
    "Action",
  ];

  const data = await getUsers();

  return (
    <>
      <Sidenav>
        <h4>Customers</h4>
        <Datatable header={header}>
          {data.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.name}</td>
              <td>{e.contactNumber}</td>
              <td>{e.address}</td>
              <td>{e.verified ? "Verfied" : "Pending"}</td>
              <td>{e.discounted ? "Discounted" : "Not Discounted"}</td>
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
