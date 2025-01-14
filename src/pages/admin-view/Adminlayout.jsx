import AdminSideBar from "@/components/admin-view/AdminSideBar"
import Header from "@/components/admin-view/Header"
import { useState } from "react"
import { Outlet } from "react-router-dom"

const Adminlayout = () => {
  const[openSleide,seteOpenSlide]=useState(false)
  return (
    <div className="flex flex-1 w-full  min-h-screen">
      <AdminSideBar open={openSleide} setOPen={seteOpenSlide}/>
      <div className="flex flex-1  w-full  overflow-auto flex-col">
        <Header setopen={seteOpenSlide}/>

        <section className="flex-1  flex-col  flex bg-muted/40 p-4 md:p-6 "> 
          <Outlet>

          </Outlet>

        </section>

      </div>

      
      
    </div>
  )
}

export default Adminlayout
