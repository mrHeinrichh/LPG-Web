import { IQuery } from "@/interfaces";
import { AppointmentStatus, ICustomerModel } from "@/models";

// Types & Interfaces
export type GetPendingCustomers = (query: IQuery) => Promise<void>;
export type VerifyCustomer = (id: string) => Promise<void>;

// Actions
export interface IPendingCustomerListActions {
  getPendingCustomers: GetPendingCustomers;
  verifyCustomer: VerifyCustomer;
}

// States
export interface IPendingCustomerListState {
  pendingCustomers: ICustomerModel[];
}

export type PendingCustomerListStore = IPendingCustomerListActions &
  IPendingCustomerListState;
