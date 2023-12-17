import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { setCredits } from '../../features/authSlice';
import { useLoginMutation} from '../../app/api/authApiSlice';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Loading from '../Loading/Loading.Component';
import Notifications from '../Notification';
import Buttons from '../Button';
import { errorHandler } from '../../utils/errorHandler';

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
  borderRadius: "10px 0px 0px 10px",
  "&:hover":{
    backgroundColor: "rgba(0, 128, 146, 0.9)"
  }
}

const signInSwitchBtn2 = {
  border: "1px solid #F1C36C",
  borderRadius: "0px 10px 10px 0px",
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

const SignIn = () => {
  const [errMsg, setErrMsg] = useState('')
  const [open, setOpen] = useState(false)
  const [showpwd, setShowpwd] = useState(false)

  const handleClickShowPassword = () => {
    setShowpwd(!showpwd)
  };

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
      } catch (err) {
        setOpen(true)
        setErrMsg(errorHandler(err))
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
        <div className='bg-white h-[480px] w-[90%] md:w-[700px] rounded-lg shadow-md flex flex-col items-center'>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
                  Sign In
                </h2>
              </div>

              <div className="inline-flex rounded-md shadow-sm">
                <Buttons variant="contained" style={signInSwitchBtn} text="Sign In with Email address" />
                <Buttons variant="outlined" style={signInSwitchBtn2} text="Sign In with Phone Number" onClick={navigateToSignInWithPhoneNumber} />
              </div>

              <form className="mt-8 space-y-6 w-full md:w-[462px] flex flex-col"  onSubmit={handleSubmit} >
                <CssTextField 
                  label="Email" 
                  id="custom-css-outlined-input"
                  type='email' 
                  size='small'
                  onChange={handleChange} 
                  name="email" 
                  value={email}
                  required
                  fullWidth
                />

                <CssTextField
                  required
                  label="Password"
                  id="password"
                  type={showpwd ? 'text' : 'password'}
                  onChange={handleChange} 
                  name="password" 
                  value={password}
                  size='small'
                  endadornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showpwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

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

export default SignIn;

