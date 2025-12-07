import store from '../../store';

describe('root reducer & store initialization', () => {
  it('expected slices', () => {
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
});
