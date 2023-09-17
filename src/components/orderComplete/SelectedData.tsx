import { Dispatch } from 'react';

type Props = {
  orderId: number;
  setSelectedOrders: Dispatch<React.SetStateAction<number[]>>;
};

const SelectedData = ({ orderId, setSelectedOrders }: Props) => {
  return (
    <button
      className='flex items-center justify-between p-2 border hover:bg-gray-200 border-gray-300 rounded'
      onClick={() =>
        setSelectedOrders((prev) => prev.filter((id) => id !== orderId))
      }
    >
      <li>{`Encomenda n°${orderId}`}</li>
    </button>
  );
};

export default SelectedData;
