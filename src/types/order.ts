export interface IOrderProduct {
  name: string;
  quantity: number;
  price: number;
}
export interface IOrder {
  products: IOrderProduct[];
  date: Date;
  totalPrice: number;
}
