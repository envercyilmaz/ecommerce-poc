import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  totalPrice: 0
}

const _getCopyOfState = data => data?.length ? [...JSON.parse(JSON.stringify(data))] : [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Triggered by every time cartItems changed 
    setCartTotalPrice: (state, action) => {
      const items = action.payload ? [...action.payload] : null;
      if(!items?.length) {
        return 0;
      }
      const total = items.reduce(function (acc, obj) { return acc + (obj.price * obj.amount); }, 0);
      state.totalPrice = total.toFixed(2);
    },
    // Triggered by "-" and "+" buttons of the shopping cart
    handleCartItemAmountChange: (state, action) => {
      const { index, increment } = action.payload;
      let cartItemsCopy = _getCopyOfState(state.cartItems);
      const cartItem = cartItemsCopy[index];
      // If only 1 item is left and it is decreased by one, item is completely removed from the cart
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
    // Triggered by add buttons of the ProductList
    handleAddCartItem: (state, action) => {
      const item = { ...action.payload };
      let cartItemsCopy = _getCopyOfState(state.cartItems);

      const foundIndex = cartItemsCopy?.findIndex(el => el.slug === item.slug);
      // If item is already in the cart just increments the amount
      if(foundIndex >= 0) {
        cartItemsCopy[foundIndex].amount++;
        state.cartItems = cartItemsCopy;
      } else {
        item.amount = 1;
        const existingItems = state.cartItems || [];
        state.cartItems = [...existingItems, ...[item]];
      }
    },
    // Triggered by "Remove" buttons of the cart
    handleRemoveCartItem: (state, action) => {
      const index = action.payload;
      let cartItemsCopy = _getCopyOfState(state.cartItems);
      cartItemsCopy.splice(index, 1);
      state.cartItems = cartItemsCopy;
      if(!cartItemsCopy?.length) {
        state.totalPrice = 0;
      }
    },
    // Not used currently
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  }
})

export const { setCartTotalPrice, handleCartItemAmountChange, handleAddCartItem, handleRemoveCartItem, clearCart } = cartSlice.actions

export default cartSlice.reducer