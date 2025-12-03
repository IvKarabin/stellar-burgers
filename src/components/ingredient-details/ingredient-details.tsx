import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const items = useSelector((state) => state.ingredients.items);
  const ingredientData = items.find((item) => item._id === id);
  
  if (!ingredientData) {
    if (items.length === 0) {
      return <Preloader />;
    }
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
