import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import UserCartItemsContent from './card-items-content';
import { useNavigate } from 'react-router-dom';

const UserCartWrapper = ({setOpenCartSheet,cartItems}) => {

  const navigate=useNavigate()
    console.log(cartItems,'newwwa');

    const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
      console.log(totalCartAmount);
      
    

   
  return (
    <SheetContent className="sm:max-w-md w-full h-[100vh] custom-scrollbar overflow-auto px-4 py-6">
    <SheetHeader className="text-center">
      <SheetTitle className="text-2xl font-semibold">Your Cart</SheetTitle>
    </SheetHeader>
  
    <div className="mt-8 space-y-6">
      {cartItems && cartItems.length > 0
        ? cartItems.map((item) => <UserCartItemsContent key={item.id} cartItem={item} />)
        : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
    </div>
  
    <div className="mt-8 flex justify-between items-center">
      <span className="font-semibold text-lg">Total</span>
      <span className="font-semibold text-lg">{totalCartAmount}</span>
    </div>
  
    <Button
      onClick={() => {
        navigate("/shop/checkout");
        setOpenCartSheet(false);
      }}
      className="w-full mt-6 py-3 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition"
    >
      Checkout
    </Button>
  </SheetContent>
  
  )
}

export default UserCartWrapper