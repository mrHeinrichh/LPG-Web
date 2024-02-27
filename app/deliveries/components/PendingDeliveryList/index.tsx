import { ApprovalsList, Card, Button, DeliveryCard } from "@/components";
import { useTransactionStore } from "@/states";
import { useMemo } from "react";

export default function PendingCustomerList({ setcurrent, setopen }: any) {
  const { transactions, approve, decline } = useTransactionStore() as any;

  const data = useMemo(
    () => transactions.filter((e: any) => e.status == "Pending"),
    [transactions]
  );

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Pending ({data.length})</p>
          <div></div>
        </div>
      }
    >
      {data.map((e: any) => {
        return (
          <Card
            key={e._id}
            onClick={() => {
              setcurrent(e);
              setopen(true);
            }}
          >
            <DeliveryCard data={e} />
          </Card>
        );
      })}
    </ApprovalsList>
  );
}
