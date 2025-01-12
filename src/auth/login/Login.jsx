import Form from "@/components/common/Form"
import { loginFormControl } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { LoginUser } from "@/store/authSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
const initildata={
  email:'',
  password:''

}

const Login = () => {
  
  let[formData,setFormData]=useState(initildata)

  let dispatch=useDispatch()

  let navigate=useNavigate()

  const { toast } = useToast()


  function handleLogin(e){
    e.preventDefault();
    dispatch(LoginUser(formData)).then((data)=>{
      if(data?.payload?.data?.success==true){
        localStorage.setItem('auth',JSON.stringify(data?.payload?.data))
        console.log(data);
        
       
        toast({
          title: data?.payload?.data.message
        });
        
        if(data?.payload?.data.user.role=='admin'){
          navigate('/admin/dashboard')
          return false


        }

        navigate('/shop/home')
       

        
        
      }else {
        toast({
          title: data?.payload?.data.message,
          variant:'destructive'
        });
        console.log(data,'problem had happen');
        
      }

    })

    
    
    

  }
 
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Sign in to your account
      </h1>
      <p className="mt-2">
        Don't have an account ?
        <Link
          className="font-medium ml-2 text-blue-600 text-primary hover:underline"
          to="/auth/register"
        >
          Register now
        </Link>
      </p>
    </div>
    <Form
      formControls={loginFormControl}
      buttonText={"Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleLogin}
    />
  </div>
  )
}

export default Login
