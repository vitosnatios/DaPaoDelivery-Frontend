import { IOrderProduct } from '../../types/order';

const OrderProduct = ({ product }: { product: IOrderProduct }) => {
  return (
    <li className='flex flex-wrap justify-between items-center gap-4'>
      <span className='font-semibold'>{product.product_name}</span>
      <div className='flex gap-1'>
        <span className='text-gray-600'>{product.quantity}x</span>
        <span className='text-gray-600'>
          R$ {Number(product.price).toFixed(2)}
        </span>
      </div>
    </li>
  );
};

export default OrderProduct;
