import reducer, { fetchFeed, initialState } from '../feedSlice';

const mockFeedData = {
  success: true,
  orders: [
    {
      _id: 'order1',
      name: 'Burger1',
      status: 'done',
      ingredients: ['1'],
      createdAt: '01-01-2025',
      updatedAt: '01-01-2025',
      number: 1111
    },
    {
      _id: 'order2',
      name: 'Burger2',
      status: 'pending',
      ingredients: ['2'],
      createdAt: '02-01-2025',
      updatedAt: '02-01-2025',
      number: 2222
    }
  ],
  total: 9999,
  totalToday: 55
};

describe('feedSlice', () => {
  test('pending', () => {
    const next = reducer(initialState, fetchFeed.pending('', undefined));
    expect(next.isLoading).toBe(true);
    expect(next.error).toBe(null);
    expect(next.orders.length).toBe(0);
  });

  test('fulfilled', () => {
    const next = reducer(
      initialState,
      fetchFeed.fulfilled(mockFeedData, '', undefined)
    );
    expect(next.isLoading).toBe(false);
    expect(next.orders.length).toBe(2);
    expect(next.orders[0]._id).toBe('order1');
    expect(next.total).toBe(9999);
    expect(next.totalToday).toBe(55);
  });

  test('rejected', () => {
    const next = reducer(
      initialState,
      fetchFeed.rejected(new Error('fail'), '', undefined, 'ERROR')
    );
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe('ERROR');
  });
});
