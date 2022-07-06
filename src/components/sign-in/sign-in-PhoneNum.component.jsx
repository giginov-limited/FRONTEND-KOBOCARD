import {Outlet , useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState} from 'react';
import './sign-in.styles.scss'

const SignInWithPhoneNumber = () => {
  const defaultformfields = {
  number:'',
  password:'',
}

  const [formFields, setFormFields] = useState(defaultformfields);
  const {number, password} = formFields;



  const resetFormfields = () => {
    setFormFields(defaultformfields);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
     try{
       await axios.post('https://kobo-card.herokuapp.com/users/signinPhone', formFields)
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

  const navigateToSignInWithEmail= ()=>{
    navigate('/sign-in')
  }
  return(
    <div className='sign-in-page'>
    <div className='sign-in-container'>
      <h2>Sign in</h2>
   <form className='form-styles' onSubmit={handleSubmit}>

    <div className='inputs'>
   <label>Phone Number</label>
   <input required onChange={handleChange} name="number" value={number}/>
    </div>

   <div className='inputs'>
   <label>Password</label>
   <input type="password" required onChange={handleChange} name="password" value={password}/>
   </div>

   <span onClick={navigateToSignInWithEmail}>login with email</span><br/>

   <button  type="submit"> login </button>
   </form>
   </div>
   <Outlet />
  </div> )
}

export default SignInWithPhoneNumber;
