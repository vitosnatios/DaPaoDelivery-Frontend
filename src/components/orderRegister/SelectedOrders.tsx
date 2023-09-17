import { IProduct } from '../../types/product';

type Props = {
  product: IProduct;
  handleQuantityChange: (product: IProduct, quantity: string) => void;
  quantities: { [key: string]: string };
};

const SelectedOrders = ({
  product,
  handleQuantityChange,
  quantities,
}: Props) => {
  return (
    <li key={product.id} className='grid gap-2 items-center py-1'>
      <div>{product.name}</div>
      <input
        type='number'
        className='p-1 border border-gray-300 rounded'
        placeholder='Quantity'
        value={quantities[product.id] || '1'}
        onChange={(e) => handleQuantityChange(product, e.target.value)}
      />
    </li>
  );
};

export default SelectedOrders;
