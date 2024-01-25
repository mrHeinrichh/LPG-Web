"use client";
import { Button, Sidenav } from "@/components";
import { useCustomerStore } from "@/states";
import { useEffect } from "react";

export default function Appointments({}: any) {
  const { appointments, updateAppointmentStatus, getAppointments } =
    useCustomerStore() as any;

  useEffect(() => {
    getAppointments();
  }, [appointments]);

  return (
    <>
      <Sidenav>
        <div className="flex justify-between items-center w-full">
          <h4>Appointments</h4>
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <p>Pending</p>
          {appointments.map((e: any) => {
            return (
              <div key={e._id} className=" bg-slate-800 p-3 rounded">
                <p className="text-white-100">{e.name}</p>
                <p className="text-white-100">{e.appointmentDate}</p>

                <Button
                  onClick={() => {
                    updateAppointmentStatus(e._id, "Approved");
                  }}
                >
                  <p className="text-white-100">Approve</p>
                </Button>
              </div>
            );
          })}
        </div>
      </Sidenav>
    </>
  );
}
