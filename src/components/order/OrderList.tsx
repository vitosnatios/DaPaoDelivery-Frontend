import OrderCard from './OrderCard';
import { IOrder } from '../../types/order';

function OrderList({ orders }: { orders: IOrder[] }) {
  return orders.map((order, index) => {
    const totalPrice = order.order_products.reduce((prev, cur) => {
      return prev + cur.price * cur.quantity;
    }, 0);
    return <OrderCard totalPrice={totalPrice} key={index} order={order} />;
  });
}

export default OrderList;
