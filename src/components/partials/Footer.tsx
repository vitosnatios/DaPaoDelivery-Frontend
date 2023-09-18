const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-4 text-center'>
      <div className='container mx-auto'>
        <p className='text-lg font-semibold'>
          VitosDeveloper @ {new Date().getFullYear()}
        </p>
        <p className='text-lg'>vitosnatios@gmail.com</p>
        <a
          href='https://github.com/vitosnatios'
          className='text-blue-500 hover:underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
