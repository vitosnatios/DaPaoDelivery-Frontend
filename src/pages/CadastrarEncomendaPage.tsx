import { useState } from 'react';
import { useGlobalContext } from '../context/useGlobalContext';
import { IProduct } from '../types/product';
import Title from '../components/text/Title';
import { useNavigate } from 'react-router-dom';

const CadastrarEncomendaPage = () => {
  const navigate = useNavigate();
  const { products, setOrders } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: string }>({});

  const handleProductSelect = (product: IProduct) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((item) => item !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleQuantityChange = (product: IProduct, quantity: string) => {
    if (Number(quantity) > 0) {
      setQuantities({ ...quantities, [product.id]: quantity });
    }
  };

  const createNewOrder = async () => {
    try {
      setError(null);
      setLoading(true);
      const order = {
        order_products: selectedProducts.map((product) => ({
          id: product.id,
          product_name: product.name,
          quantity: quantities[product.id] || '1',
          price: parseFloat(product.price),
        })),
      };
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + '/api/orders/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        }
      );
      const json = await res.json();
      setSelectedProducts([]);
      setQuantities({});
      setOrders((prev) => [...prev, json]);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow flex flex-col gap-4 items-center py-4'>
      <Title>Cadastrar encomendas</Title>
      {selectedProducts.length ? (
        <div className='flex flex-col gap-4 p-2'>
          <h2 className='text-lg font-semibold'>Selecione os produtos</h2>
          <ul className='border border-gray-300 rounded p-2'>
            {selectedProducts.map((product) => (
              <li key={product.id} className='grid gap-2 items-center py-1'>
                <div>{product.name}</div>
                <input
                  type='number'
                  className='p-1 border border-gray-300 rounded'
                  placeholder='Quantity'
                  value={quantities[product.id] || '1'}
                  onChange={(e) =>
                    handleQuantityChange(product, e.target.value)
                  }
                />
              </li>
            ))}
          </ul>
          {error && <p className='text-red-400 text-center'>{error}</p>}
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={!loading ? createNewOrder : () => {}}
          >
            {!loading ? 'Criar encomenda' : 'Carregando'}
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className='flex flex-col items-center'>
        <h2 className='text-lg font-semibold mb-2'>Produtos disponíveis</h2>
        <ul className='border border-gray-300 rounded p-2'>
          {products.map((product) => (
            <li
              key={product.id}
              className={`py-1 px-4 cursor-pointer ${
                selectedProducts.includes(product)
                  ? 'bg-blue-100 border-b-2 border-blue-500'
                  : ''
              }`}
              onClick={() => handleProductSelect(product)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CadastrarEncomendaPage;
