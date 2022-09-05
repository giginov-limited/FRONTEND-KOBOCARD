import {Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  
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
      await axios.post('https://kobo-card.herokuapp.com/users/signup', form)
        .then(res => {
          console.log(res);
          navigateToSignIn();
          resetFormfields();
        });
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
   <h2 className='text-4xl my-2'>Create Your Account</h2>

   {errMsg? <p className='error'>{errMsg}</p>:null}
   <form className='w-[450px] flex flex-col  my-3' onSubmit={handleSubmit}>

   <div className='flex flex-col my-3 items-start'>
   <label className='block mb-2 text-sm font-medium text-gray-900 font-inter'>First Name</label>
   <input 
    label='first Name'
    type="text" 
    required 
    onChange={handleChange} 
    name="first_name" 
    value={first_name}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
   </div>

    <div className='flex flex-col my-3 items-start'>
   <label  className='block mb-2 text-sm font-medium text-gray-900 font-inter'>Last Name</label>
   <input
    type="text"
    required 
    onChange={handleChange} 
    name="last_name" 
    value={last_name}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
   </div>

   <div className='flex flex-col my-3 items-start'>
  <label  className='block mb-2 text-sm font-medium text-gray-900 font-inter'>Phone Number</label>
  <input 
  type="number" 
  required 
  onChange={handleChange} 
  name="phone" 
  value={phone}
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  />
  </div>

  <div className='flex flex-col my-3 items-start'>
   <label  className='block mb-2 text-sm font-medium text-gray-900 font-inter'>Email</label>
   <input 
   type="email" 
   required 
   onChange={handleChange} 
   name="email" 
   value={email}
   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
   />
    </div>

   <div className='flex flex-col my-3 items-start'>
   <label  className='block mb-2 text-sm font-medium text-gray-900 font-inter'>Password</label>
   <input 
   type="password" 
   required 
   onChange={handleChange} 
   name="password" 
   value={password}
   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
   />
   </div>

    <div className='flex flex-col my-3 items-start'>
   <label  className='block mb-2 text-sm font-medium text-gray-900 font-inter'>confirm Password</label>
   <input 
   type="password" 
   required 
   onChange={handleChange} 
   name="confirm_Password" 
   value={confirm_Password}
   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
   />
   </div>
   <button  
   type="submit"
   className='w-[200px] py-2 text-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br rounded-md'
   > Sign Up</button>
   </form>
   </div>
   <Outlet />
  </div>
  )
}

export default SignUp;
