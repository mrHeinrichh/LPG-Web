import { TableRow, Datatable, Sidenav } from "@/components";

export async function getUsers() {
  const response = await fetch(
    "https://lpg-api-06n8.onrender.com/api/v1/users"
  );

  const data = (await response.json()).data;
  return data;
}

export default async function Transactions({}: any) {
  const header: any[] = ["Name", "Contact Number", "Type", "Action"];

  const data = await getUsers();

  return (
    <>
      <Sidenav>
        <h4>Users</h4>
        <Datatable header={header}>
          {data.map((e: any) => (
            <TableRow key={e._id}>
              <td>{e.name}</td>
              <td>{e.contactNumber}</td>
              <td>{e.__t}</td>
              <td></td>
            </TableRow>
          ))}
        </Datatable>
      </Sidenav>
    </>
  );
}
