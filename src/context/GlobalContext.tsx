import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from 'react';
import { IOrder } from '../types/order';
import { IProduct } from '../types/product';
import { isOrder, isProduct } from '../types/typeCheck';

interface IGlobalContext {
  initialText: string | null;
  orders: IOrder[];
  setOrders: Dispatch<SetStateAction<IOrder[]>>;
  products: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  initialText: null,
  orders: [],
  setOrders: () => {},
  products: [],
  setProducts: () => {},
});

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [initialText, setInitialText] = useState<null | string>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  const contextValue: IGlobalContext = {
    initialText,
    orders,
    setOrders,
    products,
    setProducts,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setInitialText(
          'Conectando com o servidor, aguarde. A primeira conexão demora mais que as subsequentes.'
        );
        const serverStatus = await fetch(
          import.meta.env.VITE_SERVER_URL + '/server-status'
        );
        if (!serverStatus.ok)
          throw new Error('Error connecting to the server.');
        setInitialText('Baixando.');
        const ordersRes = await fetch(
          import.meta.env.VITE_SERVER_URL + '/api/orders'
        );
        const productsRes = await fetch(
          import.meta.env.VITE_SERVER_URL + '/api/product/get-all'
        );
        if (!ordersRes.ok || !productsRes.ok)
          throw new Error('Error connecting to the server.');
        const ordersJson = await ordersRes.json();
        const productsJson = await productsRes.json();
        setOrders(ordersJson.filter(isOrder));
        setProducts(productsJson.filter(isProduct));
        setInitialText(null);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) setInitialText(error.message);
      }
    };
    fetchOrders();
  }, []);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
