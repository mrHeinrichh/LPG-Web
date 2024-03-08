import { IQuery } from "@/interfaces";
import { AppointmentStatus, ICustomerModel } from "@/models";

// Types & Interfaces
export type GetAppointments = (query: IQuery) => Promise<void>;
export type UpdateAppointmentStatus = (
  id: string,
  appointmentStatus: AppointmentStatus
) => Promise<void>;

// Actions
export interface IRiderAppointmentsListActions {
  getAppointments: GetAppointments;
  updateAppointmentStatus: UpdateAppointmentStatus;
}

// States
export interface IRiderAppointmentsListState {
  // TODO: Add types
  appointments: ICustomerModel[];
}

export type RiderAppointmentsListStore = IRiderAppointmentsListActions &
  IRiderAppointmentsListState;
