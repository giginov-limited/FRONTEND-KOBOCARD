import {Outlet} from 'react-router-dom';
import axios from 'axios';
import {useState} from 'react';
import Footer from '../../routes/footer/footer'
import './sign-up.styles.scss'

const SignUp = () => {
  const defaultformfields = {
  firstName:'',
  lastName:'',
  number:'',
  email:'',
  password:'',
  confirmPassword:''
}

  const [formFields, setFormFields] = useState(defaultformfields);
  const {firstName,lastName,number, email, password,confirmPassword} = formFields;



  const resetFormfields = () => {
    setFormFields(defaultformfields);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
     try{
       await axios.post('https://kobo-card.herokuapp.com/users/signup', formFields)
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
  return(
    <div className='sign-up-page'>
    <div className='sign-up-container'>
    <span>Already have an Account?
      <a>Sign in </a>
    </span>
   <h2>Create Your Account</h2>
   <form className='form-styles' onSubmit={handleSubmit}>

   <div className='inputs'>
   <label>First Name</label>
   <input label='first Name' type="text" required onChange={handleChange} name="firstName" value={firstName}/>
   </div>

    <div className='inputs'>
   <label>Last Name</label>
   <input type="text" required onChange={handleChange} name="lastName" value={lastName}/>
   </div>

   <div className='inputs'>
  <label>Phone Number</label>
  <input type="number" required onChange={handleChange} name="number" value={number}/>
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
   <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
   </div>
   <button  type="submit"> sign Up</button>
   </form>
   </div>
   <Outlet />
  </div>
  )
}

export default SignUp;
