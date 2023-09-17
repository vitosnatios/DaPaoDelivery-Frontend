export interface IOrderProduct {
  product_name: string;
  quantity: number;
  price: number;
}
export interface IOrder {
  id: number;
  order_products: IOrderProduct[];
  date: string;
  totalPrice?: number;
  closed: false;
}
