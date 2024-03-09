import { ApprovalsList, DeliveryCard } from "@/components";
import { useDeliveriesStore } from "@/states";

export default function OnGoingDeliveryList({ setcurrent, setopen }: any) {
  const { onGoingDeliveries } = useDeliveriesStore();

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            On Going ({onGoingDeliveries.length})
          </p>
          <div className=""></div>
        </div>
      }
    >
      {onGoingDeliveries.map((e) => {
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
