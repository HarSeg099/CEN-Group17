import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { bookReducers } from './reducers/bookReducers'

const reducer = combineReducers({
    books: bookReducers
})


let initalState = {}

const middleware= [thunk];
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;