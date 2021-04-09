import { createSlice, current } from "@reduxjs/toolkit";

const cartReducers = createSlice({
    name: 'cart',
    initialState: {cart: []},
    reducers: {
        addToCartReducer: (state, action) => {
            for (let i = 0; i < state.cart.length; i++) {
                if(current(state).cart[i].book._id === action.payload.book._id){
                    state.cart[i].count += action.payload.count;
                    return;
                }
            }
           state.cart.push(action.payload);
           console.log(current(state));
           console.log(action.payload);
        },
        changeBookCountReducer: (state, action) => {
            console.log(action.payload.count);
            for(let i = 0; i < state.cart.length; i++){
                if(current(state).cart[i].book === action.payload.book){
                    state.cart[i].count = action.payload.count;
                    console.log(action.payload.price)
                    break;
                }
            }
            console.log(current(state));
        },
        deleteBookReducer: (state, action) => {
            for (let i= 0; i < state.cart.length; i++) {
                if(current(state).cart[i].book === action.payload){
                    state.cart.splice(i, 1);        
                }
            } 
            console.log(current(state));
            console.log(action.payload);
        }
    }
})

export const { addToCartReducer, changeBookCountReducer, deleteBookReducer } = cartReducers.actions;
export default cartReducers.reducer;
