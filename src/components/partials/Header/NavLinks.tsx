import { Link } from 'react-router-dom';

type Props = {
  toggleMenu: () => void;
  isMenuOpen: boolean;
};

const NavLinks = ({ toggleMenu, isMenuOpen }: Props) => {
  return (
    <nav
      className={`${
        isMenuOpen ? 'opacity-100' : 'opacity-0 hidden'
      } right-0 top-full flex flex-col items-end 
      md:gap-3 md:flex-row absolute md:relative md:flex-wrap 
      bg-gray-900 p-4 md:p-0 rounded-lg shadow-lg z-10`}
      onClick={toggleMenu}
    >
      <Link to='/' className='hover:text-blue-500'>
        Home
      </Link>
      <Link to='/cadastrar-encomenda' className='hover:text-blue-500'>
        Cadastrar Encomenda
      </Link>
      <Link to='/concluir-encomenda' className='hover:text-blue-500'>
        Concluir Encomenda
      </Link>
      <Link to='/relatorio' className='hover:text-blue-500'>
        Relatório
      </Link>
      <Link to='/cadastrar-produto' className='hover:text-blue-500'>
        Cadastrar Produto
      </Link>
      <Link to='/remover-produto' className='hover:text-blue-500'>
        Remover Produto
      </Link>
      <Link to='/atualizar-preco' className='hover:text-blue-500'>
        Atualizar Preço
      </Link>
    </nav>
  );
};

export default NavLinks;
