import {Outlet,useNavigate} from 'react-router-dom';
import {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { setCredits } from '../../features/authSlice';
import { useLoginMutation} from '../../app/api/authApiSlice';
import Loading from '../Loading/Loading.Component';

const SignIn = () => {
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')

  //Default fields for input fields and DB
  const defaultformfields = {
      email:'',
      password:'',
    }
  
  //Reactive values for input fields change
  const [formFields, setFormFields] = useState(defaultformfields);
  const { email, password} = formFields;
  
  //Navigation handler
  const navigate = useNavigate();

  //Navigation function to different pages
  const navigateToSignInWithPhoneNumber = () =>{ navigate('/SignInWithPhoneNumber')}
  const navigateToWelcomePage = () => {navigate('/dashboard')}
    
  
  //reset formfeilds 
   const resetFormfields = () => {
        setFormFields(defaultformfields);
    }

  //Redux hooks handler
  const [login, {isLoading}] =useLoginMutation()

 const dispatch = useDispatch();

 //Error message handler
  useEffect(()=> {
      setErrMsg('')
  },[formFields])

  //handle submit function
  const handleSubmit = async (e) => {
      e.preventDefault();

      try{
          const userData = await login(formFields).unwrap()
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

  //On change input handler
  const handleChange = (event) => {
      const {name, value} = event.target;
   
       setFormFields({...formFields,[name]: value});
     };

  const content = isLoading?
  <Loading />
  :(
      <section className='bg-BG h-screen w-full flex justify-center items-center font-inter' >
        <div className='bg-white h-[480px] w-[700px] rounded-lg shadow-md flex flex-col items-center'>
        {errMsg? <p className='error'>{errMsg}</p>:null}
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
          {errMsg? <p className='error'>{errMsg}</p>:null}
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
              Sign In
            </h2>
          </div>

          <div class="inline-flex rounded-md shadow-sm">
              <button href="#" aria-current="page" class="py-2 px-4 text-sm font-medium text-blue-700 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">    
                Sign In with Email address
              </button>

              <button href="#" class="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"  onClick={navigateToSignInWithPhoneNumber}>
                Sign In with Phone Number
              </button>
          </div>


          <form className="mt-8 space-y-6 w-[462px]"  onSubmit={handleSubmit} >
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="rounded-md shadow-sm space-y-6">
              <div className='relative group'>
                <input
                type='email'
                value ={email}
                onChange={handleChange}
                autoComplete='off'
                name='email'
                required 
                className="appearance-none border border-input-bd text-gray-900 text-sm rounded-xl peer block w-full p-2.5 sm:text-sm bg-transparent"
                />
                <label 
                className='text-gray-500 transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0'>Email</label>
              </div>

              <div className='relative group'>
                <input
                type='password'
                id='password'
                value ={password}
                name='password'
                onChange={handleChange}
                autoComplete='off'
                required 
                className="appearance-none border border-input-bd text-gray-900 text-sm rounded-xl peer block w-full p-2.5 sm:text-sm"
                />
                <label 
                className='text-gray-500 transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0'>Password</label>
              </div>
            </div>

            <div className='flex justify-end'>
            <span className='text-right text-gray-500 text-xs mr-0'>
              Forgot password?
            </span>
            </div>

            <div>
            <button  
              type="submit"
              className='w-[128px] py-2 text-white bg-register-btn rounded-full text-sm font-semibold mx-auto'
              >Log In
              </button>
            </div>
          </form>
        </div>
      </div>

         </div>

         <Outlet />
      </section>
  )

    return (
   content
)
}

export default SignIn;

