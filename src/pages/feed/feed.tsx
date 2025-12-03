import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const ingredientsLoaded = useSelector((state) => state.ingredients.items.length);
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const getFeeds = useCallback(() => {
    dispatch(fetchFeed());
    if (!ingredientsLoaded) {
      dispatch(fetchIngredients());
    }
  }, [dispatch]);

  useEffect(() => { getFeeds(); }, [getFeeds]);

  const orders: TOrder[] = feed.orders;

  if (feed.isLoading) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
