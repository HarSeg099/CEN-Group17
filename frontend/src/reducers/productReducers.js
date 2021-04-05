import { ALL_PRODUCTS_REQUEST, 
         ALL_PRODUCTS_SUCCESS, 
         ALL_PRODUCTS_FAIL,
        CLEAR_ERRORS,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAIL,
        NEW_REVIEW_REQUEST,
        NEW_REVIEW_SUCCESS,
        NEW_REVIEW_FAIL,
        NEW_REVIEW_RESET
     } 
     
from '../constants/productConstants'

export const productsReducer = (state = { products: [] }, action) => {
            switch (action.type) {
                case ALL_PRODUCTS_REQUEST:
                //case ADMIN_PRODUCTS_REQUEST:
                    return {
                        loading: true,
                        products: []
                    }
        
                case ALL_PRODUCTS_SUCCESS:
                    return {
                        loading: false,
                        products: action.payload.products,
                        productsCount: action.payload.productsCount,
                        resPerPage: action.payload.resPerPage
                      //  filteredProductsCount: action.payload.filteredProductsCount
                    }
        
             //   case ADMIN_PRODUCTS_SUCCESS:
             //       return {
            //            loading: false,
            //            products: action.payload
            //        }
        
                case ALL_PRODUCTS_FAIL:
               // case ADMIN_PRODUCTS_FAIL:
                    return {
                        loading: false,
                        error: action.payload
                    }
        
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error: null
                    }
        
                default:
                    return state;
    }
}
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }

        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
/*
export const productReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}*/