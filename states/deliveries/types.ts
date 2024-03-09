import { IQuery } from "@/interfaces";
import { IDeliveryModel } from "@/models";

// Types & Interfaces
export type GetPendingDeliveries = (query: IQuery) => Promise<void>;
export type GetApprovedDeliveries = (query: IQuery) => Promise<void>;
export type GetOnGoingDeliveries = (query: IQuery) => Promise<void>;
export type GetFeedbacks = (query: IQuery) => Promise<void>;
export type Approve = (id: string) => Promise<void>;
export type Decline = (id: string) => Promise<void>;
export type SetLimit = (value: number) => void;
export type NextPage = () => void;
export type PreviousPage = () => void;

// Actions
export interface IDevliveryActions {
  getPendingDeliveries: GetPendingDeliveries;
  getApprovedDeliveries: GetApprovedDeliveries;
  getOnGoingDeliveries: GetOnGoingDeliveries;
  approve: Approve;
  decline: Decline;
  getFeedbacks: GetFeedbacks;
  setLimit: SetLimit;
  nextPage: NextPage;
  previousPage: PreviousPage;
}

// States
export interface IDevliveryState {
  pendingDeliveries: IDeliveryModel[];
  approvedDeliveries: IDeliveryModel[];
  onGoingDeliveries: IDeliveryModel[];
  feedbacks: IDeliveryModel[];
  page: number;
  limit: number;
}

export type DevliveryStore = IDevliveryActions & IDevliveryState;
