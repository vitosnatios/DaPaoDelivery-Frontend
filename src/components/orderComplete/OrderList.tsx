import { formatDate } from '../../helpers/formatDate';
import { IOrder } from '../../types/order';

type Props = {
  order: IOrder;
  selectedOrders: number[];
  handleOrderSelect: (orderId: number) => void;
};

const OrderList = ({ order, selectedOrders, handleOrderSelect }: Props) => {
  return (
    <li
      key={order.id}
      className={`flex flex-wrap gap-4 items-center justify-between p-2 mb-2
   hover:bg-gray-200 cursor-pointer border border-gray-300 rounded ${
     selectedOrders.includes(order.id) ? 'bg-blue-100' : ''
   }`}
      onClick={() => handleOrderSelect(order.id)}
    >
      <span>{`Encomenda n°${order.id}`}</span>
      <span>{formatDate(order.date)}</span>
    </li>
  );
};

export default OrderList;
