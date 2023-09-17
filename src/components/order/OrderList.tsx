import OrderCard from './OrderCard';
import { IOrder } from '../../types/order';

function OrderList({ orders }: { orders: IOrder[] }) {
  return (
    <div>
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
}

export default OrderList;
