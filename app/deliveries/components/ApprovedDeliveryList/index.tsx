import { ApprovalsList, Card, DeliveryCard } from "@/components";
import { useTransactionStore } from "@/states";
import { useMemo } from "react";

export default function ApprovedDeliveryList({ setcurrent, setopen }: any) {
  const { transactions } = useTransactionStore() as any;

  const data = useMemo(
    () => transactions.filter((e: any) => e.status == "Approved"),
    [transactions]
  );

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Approved ({data.length})</p>
          <div className=""></div>
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
