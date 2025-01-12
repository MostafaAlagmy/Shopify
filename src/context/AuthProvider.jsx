import { checkAuth } from "@/store/authSlice";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// تعريف الـ Context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  let navigate=useNavigate()
  const [checkCatagory,setcheckCatagory]=useState(false)
  const[user,setUser]=useState(null)

  useEffect(() => {
    
    window.scrollTo(0,0)
      
    
        
     
      if(!localStorage.getItem('auth') && pathname.includes('/register')==false ){
        console.log(1);
        

        navigate('/auth/login')
        

      }
      if(localStorage.getItem('auth')){
        let authuser=JSON.parse( localStorage.getItem('auth')).user

        if( authuser.role=='user' && pathname.includes('admin') || pathname.includes('auth') ){
         
          
          navigate('/shop/home')

          

          
        }
        else{

          if(  authuser.role=='admin' && pathname.includes('shop') || pathname.includes('auth') ){
           
            navigate('/admin/dashboard')

          
            
           
          }

        }

      }
     
      
      
   
     
    

  }, [pathname]);

  let value ={
    user,
    checkCatagory,setcheckCatagory

  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
