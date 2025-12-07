import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from '../constructorSlice';

const bunMock = {
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
};

const mainMock = {
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
};

describe('constructorSlice ', () => {
  test('Bun add', () => {
    const next = reducer(initialState, addIngredient(bunMock));
    expect(next.bun).toEqual(bunMock);
    expect(next.ingredients.length).toBe(0);
  });

  test('Ingredient add', () => {
    const next = reducer(initialState, addIngredient(mainMock));
    expect(next.ingredients.length).toBe(1);

    const item = next.ingredients[0];
    expect(item._id).toBe(mainMock._id);
    expect(item.name).toBe(mainMock.name);
    expect(item.id).toBeDefined();
  });

  test('Ingredient move', () => {
    const state = {
      bun: null,
      ingredients: [
        { ...mainMock, id: '1' },
        { ...mainMock, id: '2' },
        { ...mainMock, id: '3' }
      ]
    };

    const next = reducer(state, moveIngredient({ from: 1, to: 2 }));
    expect(next.ingredients.map((i) => i.id)).toEqual(['1', '3', '2']);
  });

  test('Ingredient delete', () => {
    const stateWithLessMain = {
      bun: null,
      ingredients: [
        { ...mainMock, id: '1' },
        { ...mainMock, id: '2' }
      ]
    };

    const next = reducer(stateWithLessMain, removeIngredient('1'));
    expect(next.ingredients.length).toBe(1);
    expect(next.ingredients[0].id).toBe('2');
  });

  test('Clear constructor', () => {
    const filled = {
      bun: bunMock,
      ingredients: [
        { ...mainMock, id: '1' },
        { ...mainMock, id: '2' }
      ]
    };

    const next = reducer(filled, clearConstructor());
    expect(next).toEqual({ bun: null, ingredients: [] });
  });
});
