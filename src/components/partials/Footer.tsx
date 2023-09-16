const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-4 text-center'>
      <div className='container mx-auto'>
        <p>VitosDeveloper @ {new Date().getFullYear()}</p>
        <p>Fictional Information Here</p>
      </div>
    </footer>
  );
};

export default Footer;
