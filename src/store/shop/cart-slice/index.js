import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState={
    isLoading:true,
    cartItems:[]
}


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity }) => {
      const response = await axios.post(
        "https://e-coomerce-backend2-production.up.railway.app/api/shop/cart/add",
        {
          userId,
          productId,
          quantity,
        }
      );
      console.log(response);
      
  
      return response.data;
    }
  );

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (userId) => {
      const response = await axios.get(
        `https://e-coomerce-backend2-production.up.railway.app/api/shop/cart/get/${userId}`
      );
  
      return response.data;
    }
  );
  
export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId }) => {
      const response = await axios.delete(
        `https://e-coomerce-backend2-production.up.railway.app/api/shop/cart/${userId}/${productId}`
      );
  
      return response.data;
    }
  );
  
export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
      const response = await axios.put(
        "https://e-coomerce-backend2-production.up.railway.app/api/shop/cart/update-cart",
        {
          userId,
          productId,
          quantity,
        }
      );
  
      return response.data;
    }
  );

let cartSlice=createSlice({
    name:'cartSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading= false
            state.cartItems = action.payload.data;
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.isLoading= false
            state.cartItems = [];
        })
        .addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
          })
          .addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
          })
          .addCase(updateCartQuantity.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
          })
          .addCase(updateCartQuantity.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
          })
          .addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
          })
          .addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
          });
        
    }

})
let cartSliceShop=cartSlice.reducer
export default cartSliceShop