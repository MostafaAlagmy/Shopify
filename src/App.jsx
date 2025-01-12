import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Authlayout from './auth/Authlayout'
import Login from './auth/login/Login'
import Register from './auth/register/Register'
import Adminlayout from './pages/admin-view/Adminlayout'
import Orders from './pages/admin-view/pages/Orders'
import Features from './pages/admin-view/pages/Features'
import Products from './pages/admin-view/Products'
import Dashboard from './pages/admin-view/pages/Dashboard'
import ShopingLayout from './pages/shoping-view/ShopingLayout'
import PaypalReturn from './pages/shoping-view/pages/PaypalReturn'
import PaymentSuccess from './pages/shoping-view/pages/PaymentSuccess'
import Listing from './pages/shoping-view/pages/Listing'
import Home from './pages/shoping-view/pages/Home'
import Checkout from './pages/shoping-view/pages/Checkout'
import Account from './pages/shoping-view/pages/Account'
import Notfound from './pages/not-found/Notfound'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice'
import Searsh from './pages/shoping-view/pages/Searsh'



function App() {
  const [count, setCount] = useState(0)
  const location=useLocation()
  const {user, isAuthenticated, isLoading}=useSelector((state)=>state.auth)
  let dispatch=useDispatch()
  useEffect(()=>{
    dispatch(checkAuth()).then(()=>{
    

    })
   

  },[dispatch])
 
  
 
  
  

  return (
    <>
    
     <div className='flex w-full custom-scrollbar  h-screen'>

     

  
     
    
     

      <Routes>
      

    
     
      <Route path="/" element={<Navigate to="/shop/home" />} />

        <Route path='auth' element={<Authlayout/>}>

           <Route path='login' element={<Login/>}/>
       

           <Route path='register' element={<Register/>}/>


        </Route>

        <Route path='admin' element={<Adminlayout/>}>

           <Route path='orders' element={<Orders/>}/>
           <Route path='features' element={<Features/>}/>
           <Route path='products' element={<Products/>}/>
           <Route path='dashboard' element={<Dashboard/>}/>


        </Route>

        <Route path='shop' element={<ShopingLayout/>}>

          <Route path='search' element={<Searsh/>}/>
          <Route path='paypal-return' element={<PaypalReturn/>}/>
          <Route path='payment-success' element={<PaymentSuccess/>}/>
          <Route path='listing' element={<Listing/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='account' element={<Account/>}/>


          </Route>


      <Route path='*' element={<Notfound/>}/>
      


      </Routes>

     </div>
   
    </>
  )
}

export default App
