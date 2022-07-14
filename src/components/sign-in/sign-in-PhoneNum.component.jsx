import {Outlet , useNavigate} from 'react-router-dom';
import { useLoginWithPhoneNumberMutation } from '../../app/api/authApiSlice';
import { setCredits } from '../../features/authSlice';
import { useDispatch , useSelector} from 'react-redux/es/exports';
import {useState, useRef, useEffect} from 'react';
import './sign-in.styles.scss'

const SignInWithPhoneNumber = () => {
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')

  const defaultformfields = {
      phone:'',
      password:'',
    }
    
  const [formFields, setFormFields] = useState(defaultformfields);
  const { phone, password,} = formFields;
    
  const result = useSelector((state)=> state.auth.user);

  
  const navigate = useNavigate();

  const navigateToSignInWithEmail = () =>{ navigate('/sign-in')}
  const navigateToWelcomePage = () => {navigate('/welcome')}
    
    
   const resetFormfields = () => {
        setFormFields(defaultformfields);
      }

  const [login, {isLoading}] =useLoginWithPhoneNumberMutation()
  const dispatch =useDispatch()

  useEffect(()=> {
      setErrMsg('')
  },[formFields])

  const handleSubmit = async (e) => {
      e.preventDefault();

      try{
          const userData = await login(formFields).unwrap()
          dispatch(setCredits({...userData}))
          resetFormfields();
          navigateToWelcomePage();
      }catch(err) {
          if(!err?.response){
              setErrMsg('No server Response')
          }else if (err.response?.status === 500){
              setErrMsg('Missing Username or password')
          }else if (err.response?.status === 401) {
              setErrMsg('Unauthorized')
          } else {
              setErrMsg('login Failed')
          }
          errRef.current.focus();
      }
  }

  
  const handleChange = (event) => {
      const {name, value} = event.target;
   
       setFormFields({...formFields,[name]: value});
     };

  const content = isLoading? <h3> Loading...</h3>:(
      <section className='sign-in-page' >
        <div className='sign-in-container'>
        {errMsg? <p className='error'>{errMsg}</p>:null}
         <h2>Sign In</h2>

         <form className='form-styles' onSubmit={handleSubmit} >
          <div className='inputs'>
          <label>Phone Number </label>
          <input 
            type='Number'
            value ={phone}
            onChange={handleChange}
            autoComplete='off'
            name='phone'
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
            <span onClick={navigateToSignInWithEmail}>Sign in with Email</span>
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

export default SignInWithPhoneNumber;
