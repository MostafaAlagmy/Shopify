import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { logoutUser } from "@/store/authSlice";

function Header({ setopen }) {
  const dispatch = useDispatch();
  let navigate=useNavigate()
  const { toast } = useToast()

  function handleLogout() {
    dispatch(logoutUser()).then((data)=>{
         console.log(data.payload.success);
         if(data?.payload.success===true){
           toast({
             title: data?.payload?.message
           });
           localStorage.removeItem('auth')
           navigate('/auth/login')
         }else{
           
           
         }
         
        
       })
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setopen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Header;
