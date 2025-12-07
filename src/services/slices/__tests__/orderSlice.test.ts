import reducer, { createOrder, fetchOrders, initialState } from '../orderSlice';

const mockOrder = {
  _id: 'order1',
  name: 'Burger1',
  ingredients: ['id1', 'id2'],
  status: 'done',
  createdAt: '01-01-2025',
  updatedAt: '01-01-2025',
  number: 1111
};

const mockOrdersArr = [
  mockOrder,
  {
    _id: 'order2',
    name: 'Burger2',
    ingredients: ['id3', 'id4'],
    status: 'pending',
    createdAt: '02-01-2025',
    updatedAt: '02-01-2025',
    number: 2222
  }
];

describe('ordersSlice', () => {
  describe('createOrder', () => {
    test('pending', () => {
      const next = reducer(initialState, createOrder.pending('', ['id1']));
      expect(next.isLoading).toBe(true);
      expect(next.error).toBeNull();
      expect(next.orders.length).toBe(0);
    });

    test('fulfilled', () => {
      const next = reducer(
        initialState,
        createOrder.fulfilled(mockOrder, '', ['id1', 'id2'])
      );
      expect(next.isLoading).toBe(false);
      expect(next.orders.length).toBe(1);
      expect(next.orders[0]._id).toBe('order1');
    });

    test('rejected', () => {
      const next = reducer(
        initialState,
        createOrder.rejected(new Error('fail'), '', ['id1'], 'ERROR')
      );
      expect(next.isLoading).toBe(false);
      expect(next.error).toBe('ERROR');
    });
  });

  describe('fetchOrders', () => {
    test('pending', () => {
      const next = reducer(initialState, fetchOrders.pending('', undefined));
      expect(next.isLoading).toBe(true);
      expect(next.error).toBeNull();
    });

    test('fulfilled', () => {
      const next = reducer(
        initialState,
        fetchOrders.fulfilled(mockOrdersArr, '', undefined)
      );
      expect(next.isLoading).toBe(false);
      expect(next.orders.length).toBe(2);
      expect(next.orders[0].number).toBe(1111);
    });

    test('rejected', () => {
      const next = reducer(
        initialState,
        fetchOrders.rejected(new Error('fail'), '', undefined, 'ERROR')
      );
      expect(next.isLoading).toBe(false);
      expect(next.error).toBe('ERROR');
    });
  });
});
