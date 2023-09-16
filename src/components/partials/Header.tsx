import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-gray-900 flex flex-wrap justify-between items-center'>
      <div className='flex items-center space-x-2'>
        <h1 className='text-2xl font-semibold text-blue-500'>DáPãoDelivery</h1>
      </div>

      <nav className='space-x-4'>
        <Link to='/' className='hover:text-blue-500'>
          <span className='text-sm'>Home</span>
        </Link>
        <Link to='/cadastrar-encomenda' className='hover:text-blue-500'>
          <span className='text-sm'>Cadastrar Encomenda</span>
        </Link>
        <Link to='/concluir-encomenda' className='hover:text-blue-500'>
          <span className='text-sm'>Concluir Encomenda</span>
        </Link>
        <Link to='/relatorio' className='hover:text-blue-500'>
          <span className='text-sm'>Relatório</span>
        </Link>
        <Link to='/cadastrar-produto' className='hover:text-blue-500'>
          <span className='text-sm'>Cadastrar Produto</span>
        </Link>
        <Link to='/remover-produto' className='hover:text-blue-500'>
          <span className='text-sm'>Remover Produto</span>
        </Link>
        <Link to='/atualizar-preco' className='hover:text-blue-500'>
          <span className='text-sm'>Atualizar Preço</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
