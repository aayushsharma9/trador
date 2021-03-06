import axios from 'axios';
import {
    FETCH_USER,
    CREATE_PRODUCT,
    FETCH_ALL_PRODUCTS,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    FETCH_USER_PRODUCTS,
    FETCH_SEARCH_RESULT
} from './types';

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
    dispatch({ type: CREATE_PRODUCT, payload: res.data.success });
}

export const fetchProducts = () => async dispatch => {
    const res = await axios.get('/api/products/all');
    dispatch({ type: FETCH_ALL_PRODUCTS, payload: res.data });
}

export const fetchUserProducts = () => async dispatch => {
    const res = await axios.get('/api/products/current_user_products');
    dispatch({ type: FETCH_USER_PRODUCTS, payload: res.data });
}

export const deleteProduct = (_id) => async dispatch => {
    const res = await axios.delete(`/api/products/delete/${_id}`);
    dispatch({ type: DELETE_PRODUCT, payload: res.data.success });
}

export const updateProduct = (product) => async dispatch => {
    const res = await axios.put('/api/products/update', product);
    dispatch({ type: UPDATE_PRODUCT, payload: res.data.success });
}

export const saveProduct = (product) => async dispatch => {
    const res = await axios.post('/api/products/save', product);
    dispatch({ type: FETCH_USER, payload: res.data });    
}

export const unsaveProduct = (product) => async dispatch => {
    const res = await axios.post('/api/products/unsave', product);
    dispatch({ type: FETCH_USER, payload: res.data });    
}

export const fetchSavedProducts = () => async dispatch => {
    const res = await axios.get('/api/products/save');
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchSearchResult = (searchString) => async dispatch => {
    const res = await axios.post('/api/products/search', { searchString });
    dispatch({ type: FETCH_SEARCH_RESULT, payload: res.data });
}

export const createChatRoom = (chatRoom, recipientId) => async dispatch => {
    const res = await axios.post(`/api/chatrooms/new/${recipientId}`, chatRoom);
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchChatRooms = () => async dispatch => {
    const res = await axios.get('/api/chatrooms/all');
    dispatch({ type: FETCH_USER, payload: res.data });
}