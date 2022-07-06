import {Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './sign-up.styles.scss';

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
    <div className='sign-up-page'>
    <div className='sign-up-container'>
    <Link to='/sign-in'>Already have an Account?
       Sign in 
    </Link>
   <h2>Create Your Account</h2>

   {errMsg? <p className='error'>{errMsg}</p>:null}
   <form className='form-styles' onSubmit={handleSubmit}>

   <div className='inputs'>
   <label>First Name</label>
   <input label='first Name' type="text" required onChange={handleChange} name="first_name" value={first_name}/>
   </div>

    <div className='inputs'>
   <label>Last Name</label>
   <input type="text" required onChange={handleChange} name="last_name" value={last_name}/>
   </div>

   <div className='inputs'>
  <label>Phone Number</label>
  <input type="number" required onChange={handleChange} name="phone" value={phone}/>
  </div>

    <div className='inputs'>
   <label>Email</label>
   <input type="email" required onChange={handleChange} name="email" value={email}/>
    </div>

   <div className='inputs'>
   <label>Password</label>
   <input type="password" required onChange={handleChange} name="password" value={password}/>
   </div>

    <div className='inputs'>
   <label>confirm Password</label>
   <input type="password" required onChange={handleChange} name="confirm_Password" value={confirm_Password}/>
   </div>
   <button  type="submit"> sign Up</button>
   </form>
   </div>
   <Outlet />
  </div>
  )
}

export default SignUp;
