import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartTotalPrice: (state, action) => {
      const items = action.payload ? [...action.payload] : null;
      if(!items?.length) {
        return 0;
      }
      const total = items.reduce(function (acc, obj) { return acc + (obj.price * obj.amount); }, 0);
      state.totalPrice = total.toFixed(2);
    },
    handleCartItemAmountChange: (state, action) => {
      const { index, increment } = action.payload;
      let cartItemsCopy = [...JSON.parse(JSON.stringify(state.cartItems))];
      const cartItem = cartItemsCopy[index];
      if(cartItem.amount === 1 && increment === -1) {
        cartItemsCopy.splice(index, 1);
        if(!cartItemsCopy?.length) {
          state.totalPrice = 0;
        }
      } else {
        cartItem.amount += increment; 
      }
      state.cartItems = cartItemsCopy;
    },
    handleAddCartItem: (state, action) => {
      const item = { ...action.payload };
      const foundIndex = state.cartItems.findIndex(el => el.slug === item.slug);
      if(foundIndex >= 0) {
        let cartItemsCopy = [...JSON.parse(JSON.stringify(state.cartItems))];
        cartItemsCopy[foundIndex].amount++;
        state.cartItems = cartItemsCopy;
      } else {
        item.amount = 1;
        state.cartItems = [...state.cartItems, ...[item]];
      }
    },
    handleRemoveCartItem: (state, action) => {
      const index = action.payload;
      let cartItemsCopy = [...JSON.parse(JSON.stringify(state.cartItems))];
      cartItemsCopy.splice(index, 1);
      state.cartItems = cartItemsCopy;
      if(!cartItemsCopy?.length) {
        state.totalPrice = 0;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  }
})

export const { setCartTotalPrice, handleCartItemAmountChange, handleAddCartItem, handleRemoveCartItem, clearCart } = cartSlice.actions

export default cartSlice.reducer