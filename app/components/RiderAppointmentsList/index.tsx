import { ApprovalsList, Card, Button } from "@/components";
import { useCustomerStore, useTransactionStore } from "@/states";
import { useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { getDateToString } from "@/utils";

export default function RiderAppointmentsList() {
  const { getAppointments, appointments, updateAppointmentStatus } =
    useCustomerStore() as any;
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(3);

  const pendings = useMemo(
    () => appointments.filter((e: any) => e.appointmentStatus === "Pending"),
    [appointments]
  );

  useEffect(() => {
    getAppointments(page, limit);
  }, [page, limit]);

  return (
    <ApprovalsList
      header={
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            Rider Appointments ({pendings.length})
          </p>
          <div className="flex items-center gap-4 ">
            <div className="cursor-pointer">
              <FaChevronLeft
                onClick={() => {
                  if (page > 0)
                    if (page > 1) setpage((prev: number) => prev - 1);
                }}
              />
            </div>

            <p>{page}</p>
            <div className="cursor-pointer">
              <FaChevronRight
                onClick={() => {
                  setpage((prev: number) => prev + 1);
                }}
              />
            </div>
          </div>
        </div>
      }
    >
      {pendings.map((e: any) => {
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
