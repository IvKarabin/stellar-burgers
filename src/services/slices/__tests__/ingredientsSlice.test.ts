import reducer, { fetchIngredients, initialState } from '../ingredientsSlice';

const mockItems = [
  {
    _id: 'bun-id',
    name: 'Bun',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 111,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  {
    _id: 'ingredient-id',
    name: 'Ingredient',
    type: 'main',
    proteins: 2,
    fat: 2,
    carbohydrates: 2,
    calories: 2,
    price: 222,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredientsSlice', () => {
  test('pending', () => {
    const next = reducer(initialState, fetchIngredients.pending('', undefined));
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
    expect(next.items.length).toBe(0);
  });

  test('fulfilled', () => {
    const next = reducer(
      initialState,
      fetchIngredients.fulfilled(mockItems, '', undefined)
    );
    expect(next.isLoading).toBe(false);
    expect(next.items.length).toBe(2);
    expect(next.items[0]._id).toBe('bun-id');
  });

  test('rejected', () => {
    const next = reducer(
      initialState,
      fetchIngredients.rejected(new Error('fail'), '', undefined, 'ERROR')
    );
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe('ERROR');
  });
});
