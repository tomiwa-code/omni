import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const findId = state.products.find(
        (items) => items.id === action.payload.id
      );
      if (findId) {
        findId.quantity += action.payload.quantity;
        findId.totalPrice = findId.price * findId.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const findId = state.products.find(
        (items) => items.id === action.payload
      );
      if (findId) {
        const filteredProduct = state.products.filter(
          (items) => items.id !== action.payload
        );
        state.products = filteredProduct;
      }
    },
    emptyCart: (state) => {
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
