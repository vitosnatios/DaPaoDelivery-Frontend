import { IOrderProduct } from '../../types/order';

const OrderProduct = ({ product }: { product: IOrderProduct }) => {
  return (
    <li className='flex flex-wrap justify-between items-center gap-4'>
      <span className='font-semibold'>{product.name}</span>
      <div>
        <span className='text-gray-600'>{product.quantity}x</span>
        <span className='text-gray-600'>R$ {product.price.toFixed(2)}</span>
      </div>
    </li>
  );
};

export default OrderProduct;
