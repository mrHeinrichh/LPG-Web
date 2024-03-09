import { ApprovalsList, Card, DeliveryCard } from "@/components";
import { useDeliveriesStore } from "@/states";

export default function PendingCustomerList({ setcurrent, setopen }: any) {
  const { pendingDeliveries } = useDeliveriesStore();

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            Pending ({pendingDeliveries.length})
          </p>
          <div></div>
        </div>
      }
    >
      {pendingDeliveries.map((e: any) => {
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
