import useProductsWithTheirOrders, {
  IProductsWithTheirIrders,
} from '../helpers/useProductsWithTheirOrders';
import { useState } from 'react';

const RelatorioPage = () => {
  const products = useProductsWithTheirOrders();
  const [filters, setFilters] = useState({
    name: '',
    date: '',
    stock: '',
    purchased: '',
  });

  const [sortBy, setSortBy] = useState('');
  const [soldToday, setSoldToday] = useState('');

  const clearFilters = () => {
    setFilters({
      name: '',
      date: '',
      stock: '',
      purchased: '',
    });
    setSortBy('');
    setSoldToday('');
  };

  const calculateSoldToday = (product: IProductsWithTheirIrders) => {
    const today = new Date(filters.date);
    return product.orders.reduce((total, order) => {
      const orderDate = new Date(order.order_date);
      return (
        total +
        (orderDate.getDate() === today.getDate() + 1 &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
          ? order.order_product.quantity
          : 0)
      );
    }, 0);
  };

  const filteredProducts = products
    .filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const dateMatch =
        !filters.date ||
        product.orders.some((order) => order.order_date.includes(filters.date));
      const stockMatch =
        !filters.stock || product.stock >= parseInt(filters.stock, 10);
      const purchasedMatch =
        !filters.purchased ||
        product.purchased >= parseInt(filters.purchased, 10);
      return nameMatch && dateMatch && stockMatch && purchasedMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'stock') return b.stock - a.stock;
      if (sortBy === 'purchased') return b.purchased - a.purchased;
      return 0;
    });

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Relatório dos Produtos</h1>
      <div className='flex mb-4'>
        <input
          type='text'
          name='name'
          placeholder='Filter by name'
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className='rounded-l-md border border-gray-300 p-2 w-1/3 focus:outline-none'
        />
        <input
          type='date'
          name='date'
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className='border border-gray-300 p-2 w-1/3'
        />
        <button
          onClick={() => {
            setFilters({ ...filters, date: '' });
            setSoldToday('');
          }}
          className={`border border-gray-300 rounded-r-md p-2 ml-2 focus:outline-none ${
            filters.date ? 'bg-red-500 text-white hover:bg-red-600' : 'hidden'
          }`}
        >
          Limpar data
        </button>
      </div>
      <div className='flex mb-4'>
        <label className='mr-4'>
          <input
            type='checkbox'
            checked={sortBy === 'stock'}
            onChange={() => setSortBy('stock')}
            className='mr-2'
          />
          Ordernar por estoque
        </label>
        <label>
          <input
            type='checkbox'
            checked={sortBy === 'purchased'}
            onChange={() => setSortBy('purchased')}
            className='mr-2'
          />
          Ordenar por n° de compras
        </label>
      </div>
      {filters.date && (
        <div className='text-sm text-gray-600 mb-2'>
          Vendido {soldToday} vezes hoje
        </div>
      )}
      <button
        onClick={clearFilters}
        className='bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2 focus:outline-none'
      >
        Limpar filtros
      </button>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='bg-white rounded-lg shadow-lg p-4'>
            <h3 className='text-lg font-semibold'>{product.name}</h3>
            <p>Estoque: {product.stock}</p>
            <p>Vendido: {product.purchased} vezes.</p>
            {filters.date && (
              <p>
                Vendido {calculateSoldToday(product)} vezes em {filters.date}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatorioPage;
