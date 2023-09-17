import PageContainer from '../components/containers/PageContainer';
import OrderList from '../components/order/OrderList';
import Title from '../components/text/Title';
import { IOrder } from '../types/order';

function MainPage() {
  const orders: IOrder[] = [
    {
      date: new Date('2023-09-10'),
      products: [
        { name: 'Pão Francês', quantity: 3, price: 2.5 },
        { name: 'Croissant', quantity: 2, price: 3.0 },
      ],
      totalPrice: 11.0,
    },
    {
      date: new Date('2023-09-08'),
      products: [
        { name: 'Bolo de Chocolate', quantity: 1, price: 12.0 },
        { name: 'Café Expresso', quantity: 2, price: 2.0 },
      ],
      totalPrice: 16.0,
    },
    {
      date: new Date('2023-09-05'),
      products: [
        { name: 'Baguete', quantity: 2, price: 1.5 },
        { name: 'Torta de Morango', quantity: 1, price: 14.0 },
      ],
      totalPrice: 17.0,
    },
  ];

  return (
    <PageContainer>
      <Title>Encomendas</Title>
      {orders.length ? (
        <OrderList orders={orders} />
      ) : (
        <p>Nenhuma encomenda em aberto</p>
      )}
    </PageContainer>
  );
}

export default MainPage;
