import { useState } from 'react';
import { useGlobalContext } from '../context/useGlobalContext';
import { IProduct } from '../types/product';
import Title from '../components/text/Title';
import { useNavigate } from 'react-router-dom';
import SelectedProducts from '../components/orderRegister/SelectedOrders';
import ProductsList from '../components/orderRegister/ProductsList';
import useFetch from '../custom-hooks/useFetch';

const CadastrarEncomendaPage = () => {
  const navigate = useNavigate();
  const { products, setOrders } = useGlobalContext();
  const { loading, error, request } = useFetch();

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
    const order = {
      order_products: selectedProducts.map((product) => ({
        id: product.id,
        product_name: product.name,
        quantity: quantities[product.id] || '1',
        price: parseFloat(product.price),
      })),
    };
    const { json } = await request('/api/orders/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    setSelectedProducts([]);
    setQuantities({});
    setOrders((prev) => [...prev, json]);
    navigate('/');
  };

  return (
    <div className='bg-white rounded-lg shadow flex flex-col gap-4 items-center p-4'>
      <Title>Cadastrar encomendas</Title>
      {selectedProducts.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h2 className='text-lg font-semibold'>Selecione os produtos</h2>
          <ul className='border border-gray-300 rounded p-2'>
            {selectedProducts.map((product) => (
              <SelectedProducts
                key={product.id}
                product={product}
                handleQuantityChange={handleQuantityChange}
                quantities={quantities}
              />
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
      )}

      <div className='flex flex-col items-center'>
        <h2 className='text-lg font-semibold mb-2'>Produtos disponíveis</h2>
        <ul className='border border-gray-300 rounded p-2 flex flex-col gap-1'>
          {products.map((product) => (
            <ProductsList
              key={product.id}
              product={product}
              selectedProducts={selectedProducts}
              handleProductSelect={handleProductSelect}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CadastrarEncomendaPage;
