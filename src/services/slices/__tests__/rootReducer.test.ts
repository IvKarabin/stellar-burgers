import store, { rootReducer } from '../../store';
import constructorReducer from '../constructorSlice';
import feedReducer from '../feedSlice';
import ingredientsReducer from '../ingredientsSlice';
import ordersReducer from '../orderSlice';
import userReducer from '../userSlice';

describe('root reducer & store initialization, unknown action handle', () => {
  test('expected slices', () => {
    const state = store.getState();
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('user');
    expect(state.burgerConstructor).toMatchObject({
      bun: null,
      ingredients: []
    });
  });

  test('handle unknown action', () => {
    const fakeAction = {type: 'UNKNOWN_ACTION'};
    const state = rootReducer(undefined, fakeAction);
    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, fakeAction),
      feed: feedReducer(undefined, fakeAction),
      ingredients: ingredientsReducer(undefined, fakeAction),
      orders: ordersReducer(undefined, fakeAction),
      user: userReducer(undefined, fakeAction)
    });
  });
});
