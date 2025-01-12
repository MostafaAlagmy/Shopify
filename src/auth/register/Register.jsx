import Form from "@/components/common/Form"
import {  registerFormControl } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { LoginUser, RegisterUser } from "@/store/authSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
const initildata={
  email:'',
  password:'',
  userName:''

}

const Register = () => {
  
  let[formData,setFormData]=useState(initildata)
  let dispatch=useDispatch()
  let navigate=useNavigate()
  const { toast } = useToast()


  function handleRegister(e){
    console.log(formData);
    
    e.preventDefault();
    dispatch(RegisterUser(formData)).then((data)=>{
      if(data?.payload?.data?.success==true){
       
       dispatch(LoginUser(formData)).then((data)=>{
             if(data?.payload?.data?.success==true){
              localStorage.setItem('auth',JSON.stringify( response.data))

              
               toast({
                 title: data?.payload?.data.message
               });
               navigate('/shop/home')

             
              
       
               
               
             }else {
               toast({
                 title: data?.payload?.data.message,
                 variant:'destructive'
               });
               console.log(data,'problem had happen');
               
             }
       
           })

        
        
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
          Create new account
      </h1>
      <p className="mt-2">
      Already have an account?
        <Link
          className="font-medium ml-2 text-blue-600 text-primary hover:underline"
          to="/auth/login"
        >
          Login now
        </Link>
      </p>
    </div>
    <Form
      formControls={registerFormControl}
      buttonText={"Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleRegister}
    />
  </div>
  )
}

export default Register
