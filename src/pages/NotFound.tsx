const NotFound = () => {
  return (
    <div className='flex items-center justify-center p-20 bg-gray-100'>
      <div className='text-center'>
        <img src='/404.png' alt='404 Not Found' className='w-96 mx-auto mb-4' />
        <h1 className='text-2xl font-semibold text-gray-800'>
          404 - Page Not Found
        </h1>
        <p className='text-gray-600'>
          A página que você está procurando não existe.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
