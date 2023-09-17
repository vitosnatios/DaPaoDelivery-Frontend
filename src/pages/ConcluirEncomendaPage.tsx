import { useState } from 'react';
import { useGlobalContext } from '../context/useGlobalContext';
import Title from '../components/text/Title';
import { useNavigate } from 'react-router-dom';
import SelectedData from '../components/orderComplete/SelectedData';
import OrderList from '../components/orderComplete/OrderList';
import useFetch from '../custom-hooks/useFetch';

const ConcluirEncomendaPage = () => {
  const navigate = useNavigate();
  const { orders, setOrders } = useGlobalContext();
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const { loading, error, request } = useFetch();

  const handleOrderSelect = (orderId: number) => {
    setSelectedOrders((prev) => {
      if (!prev.includes(orderId)) {
        return [...prev, orderId];
      }
      return prev.filter((id) => id !== orderId);
    });
  };

  const handleCompleteOrders = async () => {
    await request('/api/orders/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderIds: selectedOrders }),
    });
    selectedOrders.forEach((orderId) => {
      setSelectedOrders([]);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    });
    navigate('/');
  };

  return (
    <div className='mx-auto p-4 text-center flex flex-col gap-4'>
      <Title>Completar encomendas</Title>
      {selectedOrders.length > 0 && (
        <div>
          <h2 className='text-lg font-semibold mb-2'>Selected Orders</h2>
          <ul className='border border-gray-300 rounded p-4 flex flex-col gap-4'>
            {selectedOrders.map((orderId) => (
              <SelectedData
                key={orderId}
                orderId={orderId}
                setSelectedOrders={setSelectedOrders}
              />
            ))}
          </ul>
          {error && <p className='text-red-400 text-center'>{error}</p>}
          <button
            className='mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600'
            onClick={!loading ? handleCompleteOrders : () => {}}
          >
            {!loading ? 'Completar encomendas' : 'Carregando'}
          </button>
        </div>
      )}
      <div className='flex flex-col flex-wrap gap-4'>
        <div>
          <h2 className='text-lg font-semibold mb-2'>Encomendas disponíveis</h2>
          <ul className='border border-gray-300 rounded p-4'>
            {orders
              .map((order) => (
                <OrderList
                  key={order.id}
                  order={order}
                  selectedOrders={selectedOrders}
                  handleOrderSelect={handleOrderSelect}
                />
              ))
              .reverse()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConcluirEncomendaPage;
