import { formatDate } from '../../helpers/formatDate';
import { IOrder } from '../../types/order';
import OrderProduct from './OrderProduct';

function OrderCard({
  order,
  totalPrice,
}: {
  order: IOrder;
  totalPrice: number;
}) {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-300'>
      <h2 className='text-xl font-semibold'>Encomenda n°{order.id}</h2>
      <div className='flex flex-wrap gap-1 justify-between items-center'>
        <h2 className='text-xl font-semibold'>{formatDate(order.date)}</h2>
        <p className='text-gray-700'>Total: R$ {totalPrice.toFixed(2)}</p>
      </div>
      <hr className='my-2 border-t border-gray-300' />
      <ul className='space-y-2'>
        {order.order_products.map((product, index) => (
          <OrderProduct key={index} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default OrderCard;
