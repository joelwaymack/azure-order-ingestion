import { Address } from "./address";

export interface Order {
  id: string;
  batchId: string;
  firstName: string;
  lastName: string;
  address: Address;
  email: string;
  item: string;
  quantity: number;
  totalCost: string;
  status: string;
  purchaseTimestamp: string;
  processingTimestamp: string;
  shippingTimestamp: string;
}
