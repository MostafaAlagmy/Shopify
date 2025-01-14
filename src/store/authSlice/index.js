import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState={
    isAuthenticated: false,
  isLoading: true,
  user: null,
}
export  const RegisterUser=createAsyncThunk('/auth/register',
  async(formData)=>{

    try {

    
  

    let response=await axios.post('https://e-coomerce-backend2-production.up.railway.app/api/auth/register',
      formData,{
        withCredentials: true,
      }

    )

    return response
  }catch(error){
    console.log(error,'error');
    
  }

  }
)

export  const LoginUser=createAsyncThunk('/auth/login',
  async(formData)=>{

    try {

    
  

    let response=await axios.post('https://e-coomerce-backend2-production.up.railway.app/api/auth/login',
      formData,{
        withCredentials: true,
      }

    )

    console.log(response);
    


    return response
  }catch(error){
    console.log(error);
    
  }

  }
)
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      "https://e-coomerce-backend2-production.up.railway.app/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    console.log(response.data);
    

    return response.data;
  }
);
export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "https://e-coomerce-backend2-production.up.railway.app/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
       goHead:(state,action)=>{

       }
    },extraReducers:(builder)=>{
      builder.addCase(RegisterUser.pending,(state)=>{
        state.isLoading=true


      }).addCase(RegisterUser.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=false

      }).addCase(RegisterUser.rejected,(state,action)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=false

      }).addCase(LoginUser.pending,(state)=>{
        state.isLoading=true


      }).addCase(LoginUser.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.user=!action?.payload?.data?.success?null: action.payload.data.user,
        state.isAuthenticated=!action?.payload?.data?.success?false: true

      }).addCase(LoginUser.rejected,(state,action)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=false

      }).addCase(checkAuth.pending,(state)=>{
        state.isLoading=true


      }).addCase(checkAuth.fulfilled,(state,action)=>{
        console.log('حصل ياباشا');
        
        state.isLoading=false,
        state.user=!action?.payload?.data?.success?null: action.payload.data.user,
        state.isAuthenticated=!action?.payload?.data?.success?false: true

      }).addCase(checkAuth.rejected,(state,action)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=false

      }).addCase(logoutUser.pending,(state)=>{
        state.isLoading=true


      }).addCase(logoutUser.fulfilled,(state,action)=>{
      
        
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=null

      })

    }
    
})
export const {goHead}=authSlice.actions
export default authSlice.reducer