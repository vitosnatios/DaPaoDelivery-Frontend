import { useState } from 'react';
import { useGlobalContext } from '../context/useGlobalContext';
import Title from '../components/text/Title';
import { useNavigate } from 'react-router-dom';

const ConcluirEncomendaPage = () => {
  const navigate = useNavigate();
  const { orders, setOrders } = useGlobalContext();
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const handleOrderSelect = (orderId: number) => {
    setSelectedOrders((prev) => {
      if (!prev.includes(orderId)) {
        return [...prev, orderId];
      }
      return prev.filter((id) => id !== orderId);
    });
  };

  const handleCompleteOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + '/api/orders/update',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderIds: selectedOrders }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      selectedOrders.forEach((orderId) => {
        setSelectedOrders([]);
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto p-4 text-center flex flex-col gap-4'>
      <Title>Completar encomendas</Title>
      {selectedOrders.length > 0 && (
        <div>
          <h2 className='text-lg font-semibold mb-2'>Selected Orders</h2>
          <ul className='border border-gray-300 rounded p-4 flex flex-col gap-4'>
            {selectedOrders.map((orderId) => (
              <button
                key={orderId}
                className='flex items-center justify-between p-2 border hover:bg-gray-500 border-gray-300 rounded'
                onClick={() =>
                  setSelectedOrders((prev) =>
                    prev.filter((id) => id !== orderId)
                  )
                }
              >
                <li>{`Order ${orderId}`}</li>
              </button>
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
                <li
                  key={order.id}
                  className={`flex flex-wrap gap-4 items-center justify-between p-2 mb-2
                   hover:bg-gray-500 cursor-pointer border border-gray-300 rounded ${
                     selectedOrders.includes(order.id) ? 'bg-blue-100' : ''
                   }`}
                  onClick={() => handleOrderSelect(order.id)}
                >
                  <span>{`Order ${order.id}`}</span>
                  <span>{order.date}</span>
                </li>
              ))
              .reverse()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConcluirEncomendaPage;
