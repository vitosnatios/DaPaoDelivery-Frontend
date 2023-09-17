import OrderCard from './OrderCard';
import { IOrder } from '../../types/order';

function OrderList({ orders }: { orders: IOrder[] }) {
  return orders.map((order, index) => <OrderCard key={index} order={order} />);
}

export default OrderList;
