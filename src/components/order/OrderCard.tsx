import { IOrder } from '../../types/order';
import OrderProduct from './OrderProduct';

function OrderCard({ order }: { order: IOrder }) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-300'>
      <div className='flex flex-wrap gap-1 justify-between items-center'>
        <h2 className='text-xl font-semibold'>{formatDate(order.date)}</h2>
        <p className='text-gray-700'>Total: R$ {order.totalPrice.toFixed(2)}</p>
      </div>
      <hr className='my-2 border-t border-gray-300' />
      <ul className='space-y-2'>
        {order.products.map((product, index) => (
          <OrderProduct key={index} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default OrderCard;
