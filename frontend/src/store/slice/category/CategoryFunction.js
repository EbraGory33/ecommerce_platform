import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CategoriesItems } from '../../../server/endpoints/products/product_endpoints.js';
import { LoadCategories, LoadCategoriesFail } from './CategorySlice.js'

export function useFetchCategory(){
  const dispatch = useDispatch();
  const category = async () => {
    try {
      const { data } = await CategoriesItems();
      console.log(data)
      dispatch(LoadCategories(data));
    } catch (error) {
      console.log(error);
      dispatch(LoadCategoriesFail(error));
    };
  }
  
  useEffect(() => {
    category()
  })
  return null;
}

export default useFetchCategory;