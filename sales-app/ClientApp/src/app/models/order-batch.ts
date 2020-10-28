import { Order } from "./order";

export interface OrderBatch {
  id: string;
  orders: Order[];
  batchTimestamp: string;
  shippedOrders: number;
  percentOrdersShipped: number;
}
