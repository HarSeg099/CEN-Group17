import axios from 'axios';

import { 
    ALL_BOOKS_REQUEST, 
    ALL_BOOKS_SUCCESS, 
    ALL_BOOKS_FAIL,
    CLEAR_ERRORS 

} from '../constants/bookConstants'

export const getBooks = (keyword = '',currentPage = 1, price, genre, rating = 0, topSeller) => async (dispatch) => {
    try {

        dispatch({ type: ALL_BOOKS_REQUEST })

        let link = `/api/v1/books?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
        
        if(genre) {
            link = `/api/v1/books?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&genre=${genre}&ratings[gte]=${rating}`
        }

        if(topSeller){
            link = `/api/v1/books?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}&topSeller=${topSeller}`
        }

        if(topSeller && genre) {
            link = `/api/v1/books?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}&topSeller=${topSeller}&genre=${genre}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_BOOKS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_BOOKS_FAIL,
            payload: error.response.data.message    
        }) 
    }
}

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}