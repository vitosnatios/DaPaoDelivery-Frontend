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
      <h2 className='text-2xl font-semibold mb-2'>Encomenda #{order.id}</h2>
      <div className='flex flex-wrap gap-2 justify-between items-center'>
        <div className='text-gray-700'>{formatDate(order.date)}</div>
        <ul className='space-y-2'>
          {order.order_products.map((product, index) => (
            <OrderProduct key={index} product={product} />
          ))}
        </ul>
      </div>
      <hr className='my-2 border-t border-gray-300' />

      <div className='text-xl font-semibold '>
        Total: R$ {totalPrice.toFixed(2)}
      </div>
    </div>
  );
}

export default OrderCard;
