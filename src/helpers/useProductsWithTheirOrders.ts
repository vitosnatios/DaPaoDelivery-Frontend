import { useGlobalContext } from '../context/useGlobalContext';

export default function useProductsWithTheirOrders() {
  const { products, orders } = useGlobalContext();
  const productOrdersMap = new Map();
  orders.forEach((order) => {
    order.order_products.forEach((order_product) => {
      const prevOrderMap =
        productOrdersMap.get(order_product.product_name) || [];
      productOrdersMap.set(order_product.product_name, [
        ...prevOrderMap,
        { order_product, order_date: order.date, closed: order.closed },
      ]);
    });
  });
  const withOrders = products.map((product) => ({
    ...product,
    orders: productOrdersMap.get(product.name) || [],
  }));

  return withOrders.filter(isProductsWithTheirIrders);
}

type IProductOrder = {
  order_product: {
    id: number;
    order_id: number;
    product_name: string;
    price: number;
    purchased: number;
    quantity: number;
  };
  order_date: string;
  closed: boolean;
};

export interface IProductsWithTheirIrders {
  id: number;
  name: string;
  price: string;
  stock: number;
  purchased: number;
  orders: IProductOrder[];
}

export function isProductsWithTheirIrders(
  obj: unknown
): obj is IProductsWithTheirIrders {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'price' in obj &&
    'stock' in obj &&
    'purchased' in obj &&
    'orders' in obj &&
    Array.isArray(obj.orders)
  );
}
