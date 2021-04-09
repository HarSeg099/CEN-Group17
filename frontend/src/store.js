import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, productDetailsReducer, newReviewReducer } from './reducers/productReducers'
import { authReducer,userDetailsReducer } from './reducers/userReducers'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'
import cartReducers, { addToCartReducer, changeBookCountReducer, deleteBookReducer } from './reducers/cartReducers';
import wishListReducers, { addToWishListReducer, deleteFromWishListReducer } from './reducers/wishReducers';

const reducer =combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    userDetails: userDetailsReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    newReview: newReviewReducer,
    addToCart: addToCartReducer,
    changeBookCount: changeBookCountReducer, 
    deleteBook: deleteBookReducer,
    cart: cartReducers,
    addToWishList: addToWishListReducer,
    deleteFromWishList: deleteFromWishListReducer,
    wishList: wishListReducers
})

let initialState = {}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;