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
    <div className=' bg-gray-100 flex items-center justify-center'>
      <div className='bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-2xl font-semibold mb-4'>Delete Products</h1>
        {error && <p className='text-red-400 text-center'>{error}</p>}
        {selectedProducts.length > 0 && (
          <button
            className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full mb-4'
            onClick={!loading ? handleDeleteProducts : () => {}}
          >
            {!loading ? 'Deletar Produtos selecionados' : 'Carregando'}
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
                  className='mr-2 text-blue-500'
                />
                {product.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RemoverProdutoPage;
