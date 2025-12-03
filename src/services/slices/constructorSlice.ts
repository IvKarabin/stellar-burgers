import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient | TConstructorIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient as TIngredient;
      } else {
        state.ingredients.push(ingredient as TConstructorIngredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      if (
        from < 0 ||
        to < 0 ||
        from >= state.ingredients.length ||
        to >= state.ingredients.length
      ) {
        return state;
      }
      const [movedItem] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedItem);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
//  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient
} = constructorSlice.actions;

export const addIngredient = (ingredient: TIngredient) => {
  if (ingredient.type === 'bun') {
    return constructorSlice.actions.addIngredient(ingredient);
  };
  const ingredientWithId: TConstructorIngredient = {
    ...ingredient,
    id: nanoid()
  };

  return constructorSlice.actions.addIngredient(ingredientWithId);
};


export default constructorSlice.reducer;
