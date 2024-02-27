import { ApprovalsList, Card } from "@/components";
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
          <Card
            key={e._id}
            onClick={() => {
              setcurrent(e);
              setopen(true);
            }}
          >
            <div className="flex justify-between items-center w-full p-2">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{e.name}</p>
                <p className="">{e.status}</p>
                <p className="">No. of Items: {e.items.length}</p>
                <p className="">₱ {e.total}</p>
                {e.discountIdImage != null ? (
                  <p className="">Discounted</p>
                ) : (
                  <></>
                )}
              </div>

              <div className=""></div>
            </div>
          </Card>
        );
      })}
    </ApprovalsList>
  );
}
