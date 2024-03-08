import { create } from "zustand";
import { RiderAppointmentsListStore } from "./types";
import { userRepository } from "@/repositories";
import { initialState } from "./initialState";
import { ICustomerModel } from "@/models";
import { AppointmentStatus } from "@/interfaces";

export default create<RiderAppointmentsListStore>((set) => {
  const getAppointments = async ({ page = 0, limit = 0 }) => {
    const { data, status } = await userRepository.getUsers<ICustomerModel>({
      page,
      limit,
      filter: `{"__t": "Customer", "appointmentStatus": "Pending"}`,
    });
    if (status === "success") {
      return set(() => ({ appointments: data }));
    }
  };
  const updateAppointmentStatus = async (
    _id: string,
    appointmentStatus: AppointmentStatus
  ) => {
    const { data, status } = await userRepository.updateUser<ICustomerModel>(
      _id,
      {
        appointmentStatus,
        __t: "Customer",
      }
    );

    if (status == "success") {
      return set((state) => {
        const appointments = state.appointments.filter(
          (appointment) => appointment._id != _id
        );
        return {
          appointments,
        };
      });
    }
  };
  return {
    getAppointments,
    updateAppointmentStatus,
    ...initialState,
  };
});
