// TODO: Add GEOAPIFY MODEL
export interface IModel {
  _id?: string;
  __t?: string;
  deleted: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IFeedbackModel extends IModel {
  title: string;
  question: string;
  answer?: string;
  ratings: number;
}

export type ItemType = "Product" | "Accessory";
export interface IItemModel extends IModel {
  name: string;
  category: string;
  description: string;
  weight: number;
  stock: number;
  customerPrice: number;
  retailerPrice: number;
  image: string;
  type: ItemType;
}

export interface ICartItemModel extends IItemModel {
  quantity: number;
}

export interface IMessageModel extends IModel {
  to: string | IUserModel;
  from: string | IUserModel;
  content: string;
}

export type PriceType = "Customer" | "Retailer";
export interface IPriceModel<T> extends IModel {
  item: T;
  price: number;
  reason?: string;
  type: PriceType;
}

export type PaymentMethod = "COD" | "GCASH";
export type DeliveryStatus =
  | "Pending"
  | "Approved"
  | "Declined"
  | "Completed"
  | "On Going"
  | "Cancelled"
  | "Archived"
  | "Completed";

export interface IDeliveryModel extends ITransactionModel {
  deliveryLocation: string;
  houseLotBlk: string;
  paymentMethod: PaymentMethod;
  status: DeliveryStatus;
  assembly: boolean;
  deliveryDate: Date | string | null;
  barangay: string;
  to: string | IUserModel;
  rider: string | IRiderModel;
  // TODO: Add types
  feedback: any[];
  // TODO: Add types
  statuses: any[];
  rating: number;
  pickupImages: string;
  completionImages: string;
  cancellationImages: string;
  cancelReason?: string;
  pickedUp: boolean;
  hasFeedback: boolean;
  long?: number;
  lat?: number;
}

export interface ITransactionModel extends IModel {
  name: string;
  contactNumber: string;
  total: number;
  items: ICartItemModel[];
  discounted: boolean;
  completed: boolean;
  // discountIdImage: string;
}

export interface IUploadModel extends IModel {
  path: string;
}

export interface IAdminModel {}

export type AppointmentStatus = "Pending" | "Approved" | "Declined";
export interface ICustomerModel extends IUserModel {
  address: string;
  appointmentDate: Date | string;
  appointmentStatus: AppointmentStatus;
  verified: boolean;
}

export interface IRetailerModel extends IUserModel {
  address: string;
  verified: boolean;
  doe: string;
  businessPermit: string;
  fireSafetyPermit: string;
  agreement: string;
}

export interface IRiderModel extends IUserModel {
  address: string;
  gcash: string;
  gcashQr: string;
  license: string;
  seminarCert: string;
}

export interface IUserModel extends IModel {
  name: string;
  contactNumber: string;
  image: string;
  email: string;
  password: string;
}

export interface IAnnouncementModel extends IModel {
  image: string;
  start: Date | string;
  end: Date | string;
  text?: string;
}

export interface IFaqModel extends IModel {
  image: string;
  question: string;
  answer: string;
}
