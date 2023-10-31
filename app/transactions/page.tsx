import { TableRow, Datatable, Sidenav } from "@/components";

export default function Transactions() {
  const header: any[] = [
    "Id",
    "OrderId",
    "Status",
    "Mobile No",
    "Email ID",
    "Delivery Address",
    "Action",
  ];

  return (
    <main>
      <Sidenav>
        <h4>Transactions</h4>
        <Datatable header={header}>
          <TableRow>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>6000</td>
          </TableRow>
          <TableRow>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>6000</td>
          </TableRow>{" "}
          <TableRow>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>6000</td>
          </TableRow>{" "}
          <TableRow>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>6000</td>
          </TableRow>{" "}
          <TableRow>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>6000</td>
          </TableRow>{" "}
          <TableRow>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>TEST</td>
            <td>6000</td>
          </TableRow>
        </Datatable>
      </Sidenav>
    </main>
  );
}
