import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

let initialState={
    isLoading :false,
    productsList:[],
    productDetails:null
}
export const fetchAllFilteredProducts = createAsyncThunk(
    "https://backnew-b4fj.vercel.app/products/fetchAllProducts",
    async ({filter,sort}) => {
      
        const query= new URLSearchParams({
          ...filter,
          sortBy:sort

        })
       
        console.log(query.toString(),'helllllllo');
        
        

        try {
            const result = await axios.get(
                `https://backnew-b4fj.vercel.app/api/shop/products/get?${query}`
              );
          
             
          
              return result.data;

        }catch(error){
            console.log(error);
            
        }
      
  
     
  
     
    }
  );
export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
      const result = await axios.get(
        `https://backnew-b4fj.vercel.app/api/shop/products/get/${id}`
      );
  
      return result?.data;
    }
  );
const shopProductSlice =createSlice({
    name:'shopingprodut',
    initialState,
    reducers:{
      deleteProductDetails:(state,action)=>{
        state.productDetails=null

      }
       
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilteredProducts.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            console.log(action.payload.data);
            
            state.isLoading = false;
            state.productsList = action.payload.data;
          })
          .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productsList = [];
          }).addCase(fetchProductDetails.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(fetchProductDetails.fulfilled, (state, action) => {
            console.log(action.payload.data);
            
            state.isLoading = false;
            state.productDetails = action.payload.data;
          })
          .addCase(fetchProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.productDetails = [];
          })
        
    }
})

export const {deleteProductDetails}=shopProductSlice.actions
const productSlice=shopProductSlice.reducer
export default productSlice