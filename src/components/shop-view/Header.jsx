import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from '../ui/button';
import { shoppingViewHeaderMenuItems } from '@/config';
import { Label } from '../ui/label';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
 } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from "../ui/avatar";

import { logoutUser } from '@/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/context/AuthProvider';
import UserCartWrapper from './cart-wraper';
import { fetchCartItems } from '@/store/shop/cart-slice';


function MenuItems({setOpenSlideBar}){
  let {setcheckCatagory}=useAuth()

  let {pathname}=useLocation()
  let navigate=useNavigate()
  let[searshParams,setSearshParams]=useSearchParams('')

  function handleNavigate(getCurrentMenuItem){
    
  sessionStorage.getItem('filters') && sessionStorage.removeItem('filters')
    let filters= 
    getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
      ?{
        category :[getCurrentMenuItem.id]
      }:null

    sessionStorage.setItem("filters", JSON.stringify(filters));
    console.log(searshParams);

    pathname.includes("listing") && filters !==null 
    ?setSearshParams(new URLSearchParams(`?category=${filters.category}`))  
    :navigate(getCurrentMenuItem.path)

    getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
      ? sessionStorage.setItem('hide','category'):sessionStorage.removeItem('hide')



    setOpenSlideBar &&    setOpenSlideBar(false)

   


  
   
   
    
  }
  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
    {shoppingViewHeaderMenuItems.map((item)=>{

      return <Label 
      onClick={()=>{
          handleNavigate(item)
      }}

      key={item.id}
       className="text-sm font-medium cursor-pointer"
      >
          {item.label}

      </Label>
    })}

  </nav>
}
function HeaderRightContent({setOpenSlideBar}) {

  let x=localStorage.getItem('auth')
  const { user } = x?JSON.parse(x):null
 
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  


  const{cartItems}=useSelector((state)=> state.cartSlice)

  function handleLogout() {
    dispatch(logoutUser());
    localStorage.removeItem('auth')
    navigate('/auth/login')
  }
  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

 

 

  return (  
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet  open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black cursor-pointer text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
        setOpenSlideBar &&    setOpenSlideBar(false)
            navigate("/shop/account")
          } }>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


const Header = ({setdisplayCheck}) => {
  const [openSlideBar, setOpenSlideBar] = useState(false);
 
  
  return (
    <header className='sticky  z-20 w-full top-0 left-0 border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
      <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        <Sheet open={openSlideBar} onOpenChange={()=>setOpenSlideBar(false)} >
          
            <Button
             onClick={() => setOpenSlideBar(true)} 
            variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
         
          <SheetContent side="left" className="w-full max-w-xs">
             <MenuItems  setOpenSlideBar={setOpenSlideBar} />
            <HeaderRightContent  setOpenSlideBar={setOpenSlideBar} />  
          </SheetContent>
        </Sheet>

         <div className="hidden lg:block">
          <MenuItems   />
        </div>

        <div className="hidden lg:block">
        <HeaderRightContent /> 
        </div>
      
      </div>

    </header>
  )
}

export default Header