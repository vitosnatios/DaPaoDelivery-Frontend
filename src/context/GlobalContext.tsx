import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from 'react';
import { IOrder } from '../types/order';

interface IGlobalContext {
  orders: IOrder[];
  setOrders: Dispatch<SetStateAction<IOrder[]>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  orders: [],
  setOrders: () => {},
});

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<IOrder[]>([
    {
      date: new Date('2023-09-05T18:45:00'),
      products: [
        { name: 'Baguete', quantity: 2, price: 1.5 },
        { name: 'Torta de Morango', quantity: 1, price: 14.0 },
      ],
      totalPrice: 17.0,
    },
  ]);

  const contextValue: IGlobalContext = {
    orders,
    setOrders,
  };

  useEffect(() => {
    console.log('realizar fetch aqui');
  }, []);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
