import { createSlice, current } from "@reduxjs/toolkit";

const wishListReducers = createSlice({
    name: 'wishList',
    initialState: {cart: []},
    reducers: {
        addToWishListReducer: (state, action) => {
            state.cart.push(action.payload);
        },
        deleteFromWishListReducer: (state, action) => {
            for (let i= 0; i < state.cart.length; i++) {
                if(current(state).cart[i].book === action.payload){
                    state.cart.splice(i, 1);        
                }
            } 
        }
    }
})

export const { addToWishListReducer, deleteFromWishListReducer } = wishListReducers.actions;

export default wishListReducers.reducer;