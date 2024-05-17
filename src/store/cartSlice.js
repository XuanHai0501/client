import { createSlice } from "@reduxjs/toolkit";

const getTotalPrice = (products) => {
  const totalPrice = products.reduce((total, item) => {
    return (total += item.quantity * item.price);
  }, 0);

  return totalPrice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    resetCart: (state) => {
      state.totalPrice = 0;
      state.products = [];
    },
    addCart: (state, { payload }) => {
      const foundProduct = state.products.find((it) => it._id === payload.product._id);

      if (foundProduct) {
        foundProduct.quantity += payload.quantity;
      } else {
        state.products.push({
          ...payload.product,
          quantity: payload.quantity,
        });
      }

      state.totalPrice = getTotalPrice(state.products);
    },

    increaseQuantity: (state, { payload }) => {
      const foundProduct = state.products.find((it) => it._id === payload);
      foundProduct.quantity++;

      state.totalPrice = getTotalPrice(state.products);
    },

    decreaseQuantity: (state, { payload }) => {
      const foundProduct = state.products.find((it) => it._id === payload);
      if (foundProduct.quantity - 1 <= 0) {
        state.products = state.products.filter((it) => it._id !== payload);
      } else {
        foundProduct.quantity--;
      }

      state.totalPrice = getTotalPrice(state.products);
    },

    removeProduct: (state, { payload }) => {
      state.products = state.products.filter((it) => it._id !== payload);

      state.totalPrice = getTotalPrice(state.products);
    },
  },
});

export const { resetCart, addCart, increaseQuantity, decreaseQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
