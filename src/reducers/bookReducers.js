import { 
    ALL_BOOKS_REQUEST, 
    ALL_BOOKS_SUCCESS, 
    ALL_BOOKS_FAIL,
    CLEAR_ERRORS 

} from '../constants/bookConstants'

export const bookReducers = (state = { books: [] }, action) => {
    switch(action.type) {
        case ALL_BOOKS_REQUEST:
            return{
                loading: true,
                books: []
            }

        case ALL_BOOKS_SUCCESS:
                return{
                    loading: false,
                    books: action.payload.books,
                    booksCount: action.payload.booksCount,
                    resPerPage: action.payload.resPerPage
                }
            
        case ALL_BOOKS_FAIL:
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