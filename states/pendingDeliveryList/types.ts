import { IQuery } from "@/interfaces";
import { AppointmentStatus, ICustomerModel, IDeliveryModel } from "@/models";

// Types & Interfaces
export type GetPendingDeliveries = (query: IQuery) => Promise<void>;
export type ApproveDelivery = (id: string) => Promise<void>;
export type DeclineDelivery = (id: string) => Promise<void>;
export type UpdateAppointmentStatus = (
  id: string,
  appointmentStatus: AppointmentStatus
) => Promise<void>;

// Actions
export interface IPendingDeliveryListActions {
  getPendingDeliveries: GetPendingDeliveries;
  approveDelivery: ApproveDelivery;
  declineDelivery: DeclineDelivery;
}

// States
export interface IPendingDeliveryListState {
  // TODO: Add types
  pendingDeliveries: IDeliveryModel[];
}

export type PendingDeliveryListStore = IPendingDeliveryListActions &
  IPendingDeliveryListState;
// getPendingDeliveries: async (page: number = 1, limit: number = 5) => {
//   const { data } = await get(
//     `transactions?page=${page}&limit=${limit}&filter={"__t": "Delivery", "status": "Pending"}`
//   );
//   if (data.status == "success") {
//     return set(() => ({
//       pendingDeliveries: data.data,
//       maxPendingDeliveries: data.meta.max,
//     }));
//   }
// },
