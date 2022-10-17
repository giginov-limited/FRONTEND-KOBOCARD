import {Outlet , useNavigate} from 'react-router-dom';
import { useLoginWithPhoneNumberMutation } from '../../app/api/authApiSlice';
import { setCredits } from '../../features/authSlice';
import { useDispatch} from 'react-redux/es/exports';
import {useState, useRef, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Buttons from '../Button';
import Loading from '../Loading/Loading.Component';
import Notifications from '../Notification';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#F1C36C',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#F1C36C',
    },
    '&:hover fieldset': {
      borderColor: '#F1C36C',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F1C36C',
    },
  },
});

const signInSwitchBtn = {
  backgroundColor: "#008092",
  borderRadius: "0px 10px 0px 0px",
  "&:hover":{
    backgroundColor: "rgba(0, 128, 146, 0.9)"
  }
}

const signInSwitchBtn2 = {
  border: "1px solid #F1C36C",
  borderRadius: "10px 0px 0px 10px",
  Color: "#373737",
  "&:hover":{
    backgroundColor:"rgba(0, 128, 146, 0.1)"
  }
}

const submitBtnStyle = {
  background: "#008092",
  padding:"10 40px",
  borderRadius: "50px",
  "&:hover":{
    backgroundColor: "rgba(0, 128, 146, 0.9)"
  }
}

const SignInWithPhoneNumber = () => {
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')
  const [open, setOpen] = useState(false)
  const [showpwd, setShowpwd] = useState(false)

  const handleClickShowPassword = () => {
    setShowpwd(!showpwd)
  };


  //Default formfields
  const defaultformfields = {
      phone:'',
      password:'',
    }
  
  //Reactive variables
  const [formFields, setFormFields] = useState(defaultformfields);
  const { phone, password,} = formFields;
 
  //Navigation redux handler
  const navigate = useNavigate();

  //Navigation funtions
  const navigateToSignInWithEmail = () =>{ navigate('/sign-in')}
  const navigateToWelcomePage = () => {navigate('/welcome')}
    
  //Function to clear input fields 
  const resetFormfields = () => {
        setFormFields(defaultformfields);  
  }

  //Redux login habdler
  const [login, {isLoading}] =useLoginWithPhoneNumberMutation()
  const dispatch =useDispatch()

  useEffect(()=> {
      setErrMsg('')
  },[formFields])

  //Submit function
  const handleSubmit = async (e) => {
      e.preventDefault();

      try{
          const userData = await login(formFields).unwrap()
          dispatch(setCredits({...userData}))
          resetFormfields();
          navigateToWelcomePage();
      }catch(err) {
        if(err?.data){
          setOpen(true)
          setErrMsg(err.data.error.Message)
        }if(!err?.data){
          setOpen(true)
          setErrMsg(err.status)
        }
      }
  }

  //Onchange handler
  const handleChange = (event) => {
      const {name, value} = event.target;
   
       setFormFields({...formFields,[name]: value});
     };

  const content = isLoading?
  <Loading />
   :(
    <section className='bg-BG h-screen w-full flex justify-center items-center font-inter' >
      <div className='bg-white h-[480px] w-[90%] md:w-[700px] rounded-lg shadow-md flex flex-col items-center'>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
                Sign In
              </h2>
            </div>

          <div class="inline-flex rounded-md shadow-sm">
            <Buttons variant="outlined" style={signInSwitchBtn2} text="Sign In with Email address" onClick={navigateToSignInWithEmail}/>
            <Buttons variant="contained" style={signInSwitchBtn} text="Sign In with Phone Number"  />
          </div>

          <form className="mt-8 space-y-6 w-full md:w-[462px] flex flex-col"  onSubmit={handleSubmit} >
            <CssTextField 
            label="Phone" 
            id="custom-css-outlined-input" 
            size='small'
            onChange={handleChange} 
            name="phone" 
            value={phone}
            required/>

            <CssTextField
            required
            label="Password"
            id="password"
            type={showpwd ? 'text' : 'password'}
            onChange={handleChange} 
            name="password" 
            value={password}
            size='small'
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showpwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }/>

            <div className='flex justify-end'>
              <span className='text-right text-gray-500 text-xs mr-0'>
                Forgot password?
              </span>
            </div>

            <div>
              <Buttons variant="contained" style={submitBtnStyle} text="Log In" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
    <Notifications open={open} setOpen={setOpen} text={errMsg} severity="error" />
  </section>
  )

  return content

}

export default SignInWithPhoneNumber;
