import { ChangeEvent, FormEvent, useState } from 'react';
import useFetch from '../custom-hooks/useFetch';
import { useGlobalContext } from '../context/useGlobalContext';
import { useNavigate } from 'react-router-dom';

const CadastrarProdutoPage = () => {
  const navigate = useNavigate();
  const { setProducts } = useGlobalContext();
  const { loading, error, request } = useFetch();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { response, json } = await request('/api/product/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (response && response.ok) {
      setProducts((prev) => [...prev, json.product]);
      navigate('/cadastrar-encomenda');
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-semibold mb-4'>Register New Product</h1>
      <form onSubmit={!loading ? handleSubmit : (e) => e.preventDefault()}>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={product.name}
            onChange={handleChange}
            className='border rounded-lg px-3 py-2 w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='price' className='block text-gray-700'>
            Price
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={product.price}
            onChange={handleChange}
            className='border rounded-lg px-3 py-2 w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='stock' className='block text-gray-700'>
            Stock
          </label>
          <input
            type='number'
            id='stock'
            name='stock'
            value={product.stock}
            onChange={handleChange}
            className='border rounded-lg px-3 py-2 w-full'
            required
          />
        </div>
        {error && <p className='text-red-400 text-center'>{error}</p>}
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
        >
          {!loading ? 'Register Product' : 'Carregando'}
        </button>
      </form>
    </div>
  );
};

export default CadastrarProdutoPage;
