import React from 'react';

type Props = { children: React.ReactNode };

const PageContainer = ({ children }: Props) => {
  return <div className='flex flex-col items-center gap-4'>{children}</div>;
};

export default PageContainer;
