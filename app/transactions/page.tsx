import { Datatable, Sidenav } from "@/components";

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
        <Datatable header={header} />
      </Sidenav>
    </main>
  );
}
