import { ApprovalsList, Card, DeliveryCard } from "@/components";
import { useTransactionStore } from "@/states";
import { useMemo } from "react";

export default function OnGoingDeliveryList({ setcurrent, setopen }: any) {
  const { transactions } = useTransactionStore() as any;

  const data = useMemo(
    () => transactions.filter((e: any) => e.status == "On Going"),
    [transactions]
  );

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">On Going ({data.length})</p>
          <div className=""></div>
        </div>
      }
    >
      {data.map((e: any) => {
        return (
          <DeliveryCard
            key={e._id}
            data={e}
            onClick={() => {
              setcurrent(e);
              setopen(true);
            }}
          />
        );
      })}
    </ApprovalsList>
  );
}
