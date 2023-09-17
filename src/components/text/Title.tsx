import React from 'react';

type Props = { children: React.ReactNode };

const Title = ({ children }: Props) => {
  return <h1 className='text-2xl font-semibold'>{children}</h1>;
};

export default Title;
