import Header from "@/components/shop-view/Header"
import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"

const ShopingLayout = () => {
  const{pathname}=useLocation()
  let {displayCheck,setdisplayCheck}=useState(false)
  useEffect(()=>{
    let main_element=document.querySelector('.main-element')
    if(main_element){
      main_element.scrollTo(0,0)
      
      
    }

  },[pathname])

 
  return (
    <div className="main-element flex flex-col flex-1 min-h-screen h-auto bg-white custom-scrollbar overflow-x-hidden ">
      <Header setdisplayCheck={setdisplayCheck}/>
      <main className="flex main flex-1 w-full">
        <Outlet  displayCheck={displayCheck} setdisplayCheck={setdisplayCheck}  ></Outlet>
      </main>

    </div>
  )
}

export default ShopingLayout