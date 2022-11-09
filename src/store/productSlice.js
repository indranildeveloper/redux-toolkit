import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  data: [],
  status: STATUSES.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  //   reducers: {
  //     setProducts(state, action) {
  //       // Do not o this because reducers are syncronized
  //       // const res = await fetch(`https://fakestoreapi.com/products`);
  //       state.data = action.payload;
  //     },
  //     setStatus(state, action) {
  //       state.status = action.payload;
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunk middleware is inbuilt in redux-toolkit

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const data = await res.json();
  return data;
});

// export function fetchProducts() {
//   // Return a function
//   return async function fetchProductThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const res = await fetch(`https://fakestoreapi.com/products`);
//       const data = await res.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }
