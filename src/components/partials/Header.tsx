import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import NavLinks from './Header/NavLinks';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (window.innerWidth <= 768) setMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      return setMenuOpen(true);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(window.innerWidth >= 768 ? true : false);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className='bg-gray-900 text-gray-300 py-4 px-6 md:px-16'>
      <div className='container mx-auto flex flex-wrap justify-between items-center relative'>
        <Link to='/' className=' hover:text-white block'>
          <h1 className='text-3xl font-bold'>DáPãoDelivery</h1>
        </Link>

        <FaBars className='md:hidden  hover:text-white' onClick={toggleMenu} />

        <NavLinks toggleMenu={handleResize} isMenuOpen={isMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
