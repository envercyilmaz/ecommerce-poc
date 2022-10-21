import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [
    {
      "price":11.99,
      "name":"Licensed Snow Mug",
      "amount": 1
   },
   {
      "price":12.99,
      "name":"Intelligent Trees Shirt",
      "amount": 5
   },
   {
      "price":15.99,
      "name":"Incredible Ocean Shirt",
      "amount": 3
   }
  ],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartTotalPrice: (state, action) => {
      const items = action.payload ? [...action.payload] : null;
      if(!items?.length) {
        return "";
      }
      const total = items.reduce(function (acc, obj) { return acc + (obj.price * obj.amount); }, 0);
      state.totalPrice = total;
    },
    handleCartItemChange: (state, action) => {
      const { index, increment } = action.payload;
      // if(!items?.length) {
      //   return "";
      // }
      // const total = items.reduce(function (acc, obj) { return acc + (obj.price * obj.amount); }, 0);
      // state.totalPrice = total;
    },
    handleAddCartItem: (state, action) => {
      const item = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  }
})

export const { setCartTotalPrice, handleCartItemsChange, handleAddCartItem, clearCart } = cartSlice.actions

export default cartSlice.reducer