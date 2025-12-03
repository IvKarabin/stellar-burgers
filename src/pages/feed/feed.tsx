import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const ingredientsLoaded = useSelector((state) => state.ingredients.items.length);
  const feed = useSelector((state) => state.feed);

  const getFeeds = useCallback(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  useEffect(() => { getFeeds(); }, [getFeeds]);

  const orders: TOrder[] = feed.orders;

  if (!ingredientsLoaded) {
    return <Preloader />;
  }
  
  if (feed.isLoading) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
