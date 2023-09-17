import { IOrder } from './order';
import { IProduct } from './product';

export function isProduct(product: unknown): product is IProduct {
  if (typeof product === 'object' && product !== null) {
    const { id, name, price, purchased, stock } = product as IProduct;
    return (
      typeof id === 'number' &&
      typeof name === 'string' &&
      typeof price === 'string' &&
      typeof purchased === 'number' &&
      typeof stock === 'number'
    );
  }
  return false;
}

export function isOrder(order: unknown): order is IOrder {
  if (typeof order === 'object' && order !== null) {
    const { order_products, date, closed } = order as IOrder;
    return (
      Array.isArray(order_products) &&
      typeof date === 'string' &&
      typeof closed === 'boolean'
    );
  }
  return false;
}
