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
import useFetch from '../custom-hooks/useFetch';

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
  const { request } = useFetch();
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
          'Conectando ao servidor. A primeira conexão demora mais que as subsequentes.'
        );
        const { response: status } = await request('/api/server-status');
        if (!status) setInitialText('Erro ao conectar no servidor.');
        const { response: ordersRes, json: ordersJson } = await request(
          '/api/orders'
        );

        const { response: productsRes, json: productsJson } = await request(
          '/api/product/get-all'
        );
        if (!ordersRes!.ok || !productsRes!.ok) {
          throw new Error('Error connecting to the server.');
        }
        setOrders(ordersJson.filter(isOrder));
        setProducts(productsJson.filter(isProduct));
        setInitialText(null);
      } catch (error) {
        if (error instanceof Error)
          setInitialText('Houve algum erro ao se conectar ao servidor.');
      }
    };
    fetchOrders();
  }, [request]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
