import axios from 'axios';
import { FETCH_USER, CREATE_PRODUCT, FETCH_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT, FETCH_USER_PRODUCTS } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const createProduct = (product) => async dispatch => {
    const res = await axios.post('/api/products/new', product);
    dispatch({ type: CREATE_PRODUCT, payload: res.data });
}

export const fetchProducts = () => async dispatch => {
    const res = await axios.get('/api/products/all');
    dispatch({ type: FETCH_ALL_PRODUCTS, payload: res.data });
}

export const fetchUserProducts = () => async dispatch => {
    const res = await axios.get('/api/products/current_user_products');
    console.log("Action creator says: ", res.data);
    dispatch({ type: FETCH_USER_PRODUCTS, payload: res.data.success });
}

export const deleteProducts = (id) => async dispatch => {
    const res = await axios.delete('/api/products/delete', { id });
    dispatch({ type: DELETE_PRODUCT, payload: res.data.success });
}

export const updateProduct = (product) => async dispatch => {
    const res = await axios.put('/api/products/update', product);
    dispatch({ type: UPDATE_PRODUCT, payload: res.data.success });
}

// export const getProductById = (productId) => async dispatch => {
//     const res = await axios.get(`/api/products/${productId}`);
//     dispatch({ type: FETCH_PRODUCT_BY_ID }, res.data)
// }