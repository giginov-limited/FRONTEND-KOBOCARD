import {Outlet, useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSignUpMutation } from '../../app/api/authApiSlice';

const SignUp = () => {

  const [signUp] = useSignUpMutation()
  
  const defaultformfields = {
  'first_name':'',
  'last_name':'',
  'phone':'',
  'email':'',
  'password':'',
  'confirm_Password':''
}

  const [formFields, setFormFields] = useState(defaultformfields);
  const {first_name,last_name,phone, email, password,confirm_Password} = formFields;

  const [errMsg, setErrMsg] = useState('')


  const resetFormfields = () => {
    setFormFields(defaultformfields);
  }

  const navigate = useNavigate()
  const navigateToSignIn = () => {
    navigate('/sign-in')
  }

  useEffect(()=> {
    setErrMsg('')
},[formFields])
  

  const form = {first_name,last_name,phone,email,password};

  async function handleSubmit(event) {
    if(password === confirm_Password) {
    event.preventDefault();
    try {
      await signUp(form)
      resetFormfields()
      navigateToSignIn();
    } catch (err) {
      if(!err?.response){
        setErrMsg('No server Response')
      }else if (err.response?.status === 500){
        setErrMsg('Email or Phone number already in use')
      }else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Sign up Failed')
    }
    };

  }else{
    prompt("Password ain't correct")
  };
}



  const handleChange = (event) => {
   const {name, value} = event.target;

    setFormFields({...formFields,[name]: value});
  };

  return(
    <div className='bg-BG py-8 min-h-screen font-inter'>
      <div className='w-[600px]  bg-white flex flex-col items-center rounded-lg shadow mx-auto'>
        <Link to='/sign-in' className='text-sm hover:underline'>Already have an Account?
          Sign in 
        </Link>

        <h2 className='text-4xl my-2 font-semibold'>Create Account</h2>
        <p className='text-sm my-3 opacity-30'>Enter the following credentials to create your account</p>

        {errMsg? <p className='error'>{errMsg}</p>:null}

        <form className='w-[450px] flex flex-col my-3 gap-6' onSubmit={handleSubmit}>

        <div className=' relative group'>
          <input 
            label='first Name'
            type="text" 
            required 
            onChange={handleChange} 
            name="first_name" 
            value={first_name}
            className="border border-input-bd text-gray-900 text-sm rounded-xl peer block w-full p-2.5"
          />
          <label 
          className='text-gray-500 transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0'>First Name</label>
        </div>

        <div className=' relative group'>
          <input
            type="text"
            required 
            onChange={handleChange} 
            name="last_name" 
            value={last_name}
            className="border border-input-bd text-gray-900 text-sm rounded-xl peer block w-full p-2.5"
          />
          <label  
          className='text-gray-500 transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0'>Last Name</label>
        </div>

        <div className=' relative group appearance-none'>
          <input 
            type="number" 
            required 
            onChange={handleChange} 
            name="phone" 
            value={phone}
            className="appearance-none border border-input-bd text-gray-900 text-sm rounded-xl peer block w-full p-2.5"
          />
          <label  
          className='text-gray-500 transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0'>Phone Number</label>
        </div>

        <div className=' relative group'>
          <input 
            type="email" 
            required 
            onChange={handleChange} 
            name="email" 
            value={email}
            className="border border-input-bd text-gray-900 text-sm rounded-xl peer block w-full p-2.5"
          />
          <label  
          className='text-gray-500 transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0'>Email</label>
        </div>

        <div className=' relative group'>
          <input 
          type="password" 
          required 
          onChange={handleChange} 
          name="password" 
          value={password}
          className="border border-input-bd text-gray-900 text-sm rounded-xl peer block w-full p-2.5"
          />
          <label  
          className='text-gray-500 transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0'>Password</label>
        </div>

        <div className=' relative group'>
          <input 
          type="password" 
          required 
          onChange={handleChange} 
          name="confirm_Password" 
          value={confirm_Password}
          className="border border-input-bd text-gray-900 text-sm rounded-xl peer block w-full p-2.5"
          />
          <label  
          className='text-gray-500 transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0'>confirm Password</label>
        </div>

        <div className='flex flex-col justify-start items-start gap-2'>

          <div className='flex justify-center gap-2'>
          <input type="checkbox" name="" id="" />
          <span className='text-xs text-gray-600'>I agree to the Terms and Condition.</span>
          </div>
          <div className='flex justify-center gap-2'>
          <input type="checkbox" name="" id="" />
          <span className='text-xs text-gray-600'>I agree to Promotional messages.</span>
          </div>
        </div>

        <button  
          type="submit"
          className='w-[128px] py-2 text-white bg-register-btn rounded-full text-sm font-semibold mx-auto'
        > Sign Up</button>

        </form>

      </div>
   <Outlet />
  </div>
  )
}

export default SignUp;
