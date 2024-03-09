import { ApprovalsList, Card, DeliveryCard } from "@/components";
import { useDeliveriesStore } from "@/states";

export default function ApprovedDeliveryList({ setcurrent, setopen }: any) {
  const { approvedDeliveries } = useDeliveriesStore();

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            Approved ({approvedDeliveries.length})
          </p>
          <div className=""></div>
        </div>
      }
    >
      {approvedDeliveries.map((e) => {
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
