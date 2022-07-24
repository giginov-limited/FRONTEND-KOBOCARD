import {Outlet,useNavigate} from 'react-router-dom';
import './sign-in.styles.scss'
import {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { setCredits, setUserDetails } from '../../features/authSlice';
import { useLoginMutation,useGetUserDetailsQuery } from '../../app/api/authApiSlice';

const SignIn = () => {
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')

  const defaultformfields = {
      email:'',
      password:'',
    }
    
  const [formFields, setFormFields] = useState(defaultformfields);
  const { email, password} = formFields;
    
  const result = useSelector((state)=> state.auth.user);

  
  const navigate = useNavigate();

  const navigateToSignInWithPhoneNumber = () =>{ navigate('/SignInWithPhoneNumber')}
  const navigateToWelcomePage = () => {navigate('/welcome')}
    
    
   const resetFormfields = () => {
        setFormFields(defaultformfields);
      }

  const [login, {isLoading}] =useLoginMutation()

 const dispatch = useDispatch();

  useEffect(()=> {
      setErrMsg('')
  },[formFields])

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('request sent')

      try{
          const userData = await login(formFields).unwrap()
          console.log(userData)
          dispatch(setCredits({ ...userData }))
          resetFormfields();
          navigateToWelcomePage();
      }catch(err) {
        console.log(err)
          if(!err?.response){
              setErrMsg('No server Response')
          }else if (err.response?.status === 500){
              setErrMsg('Missing Username or password')
          }else if (err.response?.status === 401) {
              setErrMsg('Unauthorized')
          } else {
              setErrMsg('login Failed')
          }
      }
  }

  
  const handleChange = (event) => {
      const {name, value} = event.target;
   
       setFormFields({...formFields,[name]: value});
     };

  const content = isLoading? <h4>loading...</h4>:(
      <section className='sign-in-page' >
        <div className='sign-in-container'>
        {errMsg? <p className='error'>{errMsg}</p>:null}
         <h2>Sign In</h2>

         <form className='form-styles' onSubmit={handleSubmit} >
          <div className='inputs'>
          <label>Email </label>
          <input 
            type='email'
            value ={email}
            onChange={handleChange}
            autoComplete='off'
            name='email'
            required 
            />
            </div>

            <div className='inputs'>
          <label>Password </label>
          <input 
            type='password'
            id='password'
            value ={password}
            name='password'
            onChange={handleChange}
            autoComplete='off'
            required 
            />
            </div>
            <span onClick={navigateToSignInWithPhoneNumber}>Sign in with phone Number</span>
          <button type='submit'> Sign In </button>
         </form>
         </div>

         <Outlet />
      </section>
  )

    return (
   content
)
}

export default SignIn;
