import {Outlet,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState} from 'react';
import './sign-in.styles.scss'
import SignInWithPhoneNumber from './sign-in-PhoneNum.component'
import{Routes,Route} from 'react-router-dom';

const SignIn = () => {
  const defaultformfields = {
  email:'',
  password:'',
}

  const [formFields, setFormFields] = useState(defaultformfields);
  const {email, password} = formFields;



  const resetFormfields = () => {
    setFormFields(defaultformfields);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
     try{
       await axios.post('https://kobo-card.herokuapp.com/users/signinEmail', formFields)
             .then(res=> {
               console.log(res)
             })
     }catch(error){
       console.log(error)
     }

    }


  const handleChange = (event) => {
   const {name, value} = event.target;

    setFormFields({...formFields,[name]: value});
  };

  const navigate = useNavigate();

  const navigateToSignInWithPhoneNumber = () =>{
    navigate('/SignInWithPhoneNumber')
  }
  return(
    <div className='sign-up-page'>
    <div className='sign-up-container'>
    <h2>Sign In</h2>
    <button onClick={navigateToSignInWithPhoneNumber}>Sign in with phone Number</button>
   <form className='form-styles' onSubmit={handleSubmit}>

    <div className='inputs'>
   <label>Email</label>
   <input type="email" required onChange={handleChange} name="email" value={email}/>
    </div>

   <div className='inputs'>
   <label>Password</label>
   <input type="password" required onChange={handleChange} name="password" value={password}/>
   </div>

   <button  type="submit"> login </button>
   </form>
   </div>
   <Outlet />
  </div> )
}

export default SignIn;
