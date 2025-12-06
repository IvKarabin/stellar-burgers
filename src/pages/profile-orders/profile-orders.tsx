import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.orders);
  const orders: TOrder[] = ordersData.orders;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (ordersData.isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
