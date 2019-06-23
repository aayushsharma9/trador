import { FETCH_ALL_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS: return { ...state, allProducts: action.payload };
        case CREATE_PRODUCT: return { ...state, createSuccess: action.payload };
        case UPDATE_PRODUCT: return { ...state, updateSuccess: action.payload };
        case DELETE_PRODUCT: return { ...state, deleteSuccess: action.payload };
        default: return state;
    }
}