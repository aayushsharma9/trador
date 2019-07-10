import {
    FETCH_ALL_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    FETCH_USER_PRODUCTS,
    FETCH_SAVED_PRODUCTS,
    FETCH_SEARCH_RESULT
} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS: return { ...state, allProducts: action.payload };
        case FETCH_USER_PRODUCTS: return { ...state, userProducts: action.payload }
        case FETCH_SAVED_PRODUCTS: return { ...state, savedProducts: action.payload }
        case CREATE_PRODUCT: return { ...state, createSuccess: action.payload };
        case UPDATE_PRODUCT: return { ...state, updateSuccess: action.payload };
        case DELETE_PRODUCT: return { ...state, deleteSuccess: action.payload };
        case FETCH_SEARCH_RESULT: return { ...state, searchResult: action.payload };
        default: return state;
    }
}