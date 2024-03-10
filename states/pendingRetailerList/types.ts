import { IQuery } from "@/interfaces";
import { AppointmentStatus, IRetailerModel } from "@/models";

// Types & Interfaces
export type GetPendingRetailers = (query: IQuery) => Promise<void>;
export type VerifyRetailer = (id: string) => Promise<void>;

// Actions
export interface IPendingRetailerListActions {
  getPendingRetailers: GetPendingRetailers;
  verifyRetailer: VerifyRetailer;
}

// States
export interface IPendingRetailerListState {
  pendingRetailers: IRetailerModel[];
}

export type PendingRetailerListStore = IPendingRetailerListActions &
  IPendingRetailerListState;
