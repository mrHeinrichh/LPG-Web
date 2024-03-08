import { ApprovalsList, Card, Button } from "@/components";
import { useRiderAppointmentsListStore } from "@/states";
import { useEffect } from "react";
import Image from "next/image";
import { getDateToString } from "@/utils";

export default function RiderAppointmentsList() {
  const { getAppointments, appointments, updateAppointmentStatus } =
    useRiderAppointmentsListStore();

  useEffect(() => {
    getAppointments({});
  }, [getAppointments]);

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            Rider Appointments ({appointments.length ?? 0})
          </p>
        </div>
      }
    >
      {appointments.map((e: any) => {
        return (
          <Card key={e._id}>
            <div className="w-full flex items-center justify-between p-3">
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold">
                  {getDateToString(e.appointmentDate)}
                </p>
                <div className="flex items-center gap-4">
                  <Image src={e.image} alt="" height={100} width={100} />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{e.name}</p>
                    <p className="">{e.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    updateAppointmentStatus(e._id, "Approved");
                  }}
                >
                  <p className="">Approve</p>
                </Button>{" "}
                <Button
                  onClick={() => {
                    updateAppointmentStatus(e._id, "Declined");
                  }}
                >
                  <p className="">Decline</p>
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </ApprovalsList>
  );
}
