import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <div className='flex-grow bg-gray-100 py-4 px-6 md:px-16'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
