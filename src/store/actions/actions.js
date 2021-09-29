import { FETCH_PRODUCTS, LOADING, FETCH_PRODUCT } from './types';
import axios from 'axios';
import { BASE_URL } from '../../url';

export const fetchProducts = () => (dispatch) => {
  axios
    .get(BASE_URL + '/products/')
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchProduct = (id) => (dispatch) => {
  axios
    .get(BASE_URL + `/product/${id}`)
    .then((response) =>
      dispatch({
        type: FETCH_PRODUCT,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export const setLoading = () => {
  return {
    type: LOADING,
  };
};
