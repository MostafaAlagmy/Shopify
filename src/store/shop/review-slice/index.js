import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//last cjeck

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {

    const response = await axios.post(
      `https://backnew-b4fj.vercel.app/api/shop/review/add`,
      formdata
    );
    console.log(response.data,'data');
    

    return response.data;
  }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
   

  const response = await axios.get(
    `https://backnew-b4fj.vercel.app/api/shop/review/${id}`
  );

  console.log(response.data,'newwwawa');
  

  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

const reviewslice=reviewSlice.reducer

export default reviewslice