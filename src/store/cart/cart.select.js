import { createSelector } from '@reduxjs/toolkit';

const selectCartReducer = (state) => {
  return state.cart;
};

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => {
  return cart.isCartOpen;
});

export const selectCartItems = createSelector([selectCartReducer], (cart) => {
  return cart.cartItems;
});

export const selectCartCount = createSelector([selectCartItems], (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
});

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
});
