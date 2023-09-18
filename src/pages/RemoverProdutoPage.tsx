import { useGlobalContext } from '../context/useGlobalContext';
import { useState } from 'react';
import useFetch from '../custom-hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const RemoverProdutoPage = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useGlobalContext();
  const { loading, error, request } = useFetch();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleProductSelect = (productId: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const handleDeleteProducts = async () => {
    const { response } = await request('/api/product/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedProducts),
    });
    if (response && response.ok) {
      selectedProducts.forEach((selectedProductId) => {
        setProducts((prev) => {
          return prev.filter((product) => product.id !== selectedProductId);
        });
      });
      navigate('/cadastrar-encomenda');
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
        <h1 className='text-3xl font-semibold text-center mb-6 text-red-500'>
          Delete Products
        </h1>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        {selectedProducts.length > 0 && (
          <button
            className={`${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            } text-white font-semibold py-2 px-4 rounded-full mb-4 w-full`}
            onClick={!loading ? handleDeleteProducts : () => {}}
            disabled={loading}
          >
            {loading ? 'Carregando' : 'Deletar Produtos Selecionados'}
          </button>
        )}
        <ul>
          {products.map((product) => (
            <li key={product.id} className='flex items-center mb-2'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleProductSelect(product.id)}
                  className='mr-2 text-red-500'
                />
                <span className='text-gray-700'>{product.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RemoverProdutoPage;
