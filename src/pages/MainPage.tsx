import PageContainer from '../components/containers/PageContainer';
import OrderList from '../components/order/OrderList';
import Title from '../components/text/Title';
import { useGlobalContext } from '../context/useGlobalContext';

function MainPage() {
  const { orders } = useGlobalContext();

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
