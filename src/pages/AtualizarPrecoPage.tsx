import { useState } from 'react';
import { useGlobalContext } from '../context/useGlobalContext';
import useFetch from '../custom-hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const AtualizarPrecoPage = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useGlobalContext();
  const { loading, error, request } = useFetch();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [updatedPrices, setUpdatedPrices] = useState<{ [key: string]: number }>(
    {}
  );
  const handleProductSelect = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      setUpdatedPrices((prev) => {
        delete prev[productId];
        return prev;
      });
    } else {
      setSelectedProducts([...selectedProducts, productId]);
      setUpdatedPrices((prev) => ({ ...prev, [productId]: 1 }));
    }
  };
  const handlePriceChange = (productId: number, newPrice: number) => {
    setUpdatedPrices({
      ...updatedPrices,
      [productId]: newPrice,
    });
  };
  const handleUpdatePrices = async () => {
    const { response } = await request('/api/product/atualizar-preco', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPrices),
    });
    if (response && response.ok) {
      const updatedProducts = products.map((product) => {
        const updatedPrice = updatedPrices[product.id.toString()];
        if (updatedPrice !== undefined) {
          return {
            ...product,
            price: updatedPrice.toFixed(2),
          };
        }
        return product;
      });
      setProducts(updatedProducts);
      navigate('/cadastrar-encomenda');
    }
  };
  return (
    <div className='bg-gray-100 text-center flex flex-col'>
      <div className='max-w-screen-lg mx-auto p-4 bg-white rounded-lg shadow-lg'>
        <h1 className='text-3xl font-semibold mb-4'>
          Atualizar preços de produtos
        </h1>
        {Object.keys(updatedPrices).length > 0 && (
          <button
            onClick={!loading ? handleUpdatePrices : () => {}}
            className={`bg-blue-500 text-white px-4 py-2 rounded`}
          >
            {!loading ? 'Alterar preços' : 'Carregando'}
          </button>
        )}
        {error && <p className='text-red-400 text-center'>{error}</p>}
        <ul className='mt-4 space-y-2'>
          {products.map((product) => (
            <li key={product.id} className='flex flex-wrap items-center'>
              <label className='flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => {
                    handleProductSelect(product.id);
                  }}
                  className='mr-2'
                />
                {product.name}
              </label>
              {selectedProducts.includes(product.id) && (
                <input
                  type='number'
                  value={updatedPrices[product.id] || '0'}
                  onChange={(e) =>
                    handlePriceChange(product.id, parseFloat(e.target.value))
                  }
                  placeholder='New Price'
                  className='ml-4 px-2 py-1 border border-gray-300 rounded'
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AtualizarPrecoPage;
