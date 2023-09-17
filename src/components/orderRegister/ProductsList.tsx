import { IProduct } from '../../types/product';

type Props = {
  product: IProduct;
  selectedProducts: IProduct[];
  handleProductSelect: (product: IProduct) => void;
};

const ProductsList = ({
  product,
  selectedProducts,
  handleProductSelect,
}: Props) => {
  return (
    <li
      key={product.id}
      className={`border border-stone-500 hover:bg-gray-100 py-1 px-4 cursor-pointer rounded ${
        selectedProducts.includes(product)
          ? 'bg-blue-100 border-b-2  border-blue-500'
          : 'border-gray-300 '
      }`}
      onClick={() => handleProductSelect(product)}
    >
      {product.name}
    </li>
  );
};

export default ProductsList;
