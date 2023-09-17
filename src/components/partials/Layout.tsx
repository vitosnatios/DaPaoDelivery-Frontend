import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from '../../context/useGlobalContext';

const Layout = () => {
  const { initialText } = useGlobalContext();

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <div className='flex-grow bg-gray-100 py-4 px-6 md:px-16'>
          {initialText ? (
            <h4 className='text-center'>{initialText}</h4>
          ) : (
            <Outlet />
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
