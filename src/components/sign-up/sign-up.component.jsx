import {Outlet, useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSignUpMutation } from '../../app/api/authApiSlice';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Buttons from '../Button';
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

const SubmitBtn = {
  width: "128px",
  height: "46px",
  color:"#FFFF",
  background:"#008092",
  borderRadius: "50px",
  '&:hover':{
    background:"#008092",
  }
}

const SignUp = () => {

  const [signUp, {isSuccess,isError,error}] = useSignUpMutation()
  const [open, setOpen] = useState(false)
  const defaultformfields = {
  'first_name':'',
  'last_name':'',
  'phone':'',
  'email':'',
  'password':'',
  'confirm_Password':''
}
  const [showpwd, setShowpwd] = useState(false)
  const [formFields, setFormFields] = useState(defaultformfields);
  const {first_name,last_name,phone, email, password,confirm_Password} = formFields;



  const [errMsg, setErrMsg] = useState('')

  const handleClickShowPassword = () => {
    setShowpwd(!showpwd)
  };


  const resetFormfields = () => {
    setFormFields(defaultformfields);
  }

  const navigate = useNavigate()
  const navigateToSignIn = () => {
    navigate('/sign-in')
  }

  const valid = password == confirm_Password
  

  const form = {first_name,last_name,phone,email,password};

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await signUp(form)
      resetFormfields()
      navigateToSignIn();
    } catch (err) {
      if(err?.data){
        setOpen(true)
        setErrMsg(err.data.error.Message)
      }if(err.status){
        setOpen(true)
        setErrMsg(err.status)
      }
    }
}



  const handleChange = (event) => {
   const {name, value} = event.target;

    setFormFields({...formFields,[name]: value});
  };

  return(
    <div className='bg-BG py-8 min-h-screen font-inter'>
      <div className='w-[90%] md:w-[600px]  bg-white flex flex-col items-center rounded-lg shadow mx-auto'>
        <Link to='/sign-in' className='text-xs md:text-sm hover:underline'>Already have an Account?
          Sign in 
        </Link>

        <h2 className='text-lg md:text-4xl my-2 font-semibold'>Create Account</h2>
        <p className='text-sm opacity-30'>Enter the following credentials to create your account</p>

        <form className='w-full md:w-[450px] flex flex-col my-3 gap-6 px-2' onSubmit={handleSubmit}>

          <CssTextField 
          label="First Name" 
          id="custom-css-outlined-input" 
          size='small'
          onChange={handleChange} 
          name="first_name" 
          value={first_name} 
          required/>

          <CssTextField 
          label="Last Name" 
          id="custom-css-outlined-input" 
          size='small'
          onChange={handleChange} 
          name="last_name" 
          value={last_name}
          required/>

          <CssTextField 
          label="Phone" 
          id="custom-css-outlined-input" 
          size='small'
          onChange={handleChange} 
          name="phone" 
          value={phone}
          required/>

          <CssTextField 
          label="Email" 
          id="custom-css-outlined-input"
          type='email' 
          size='small'
          onChange={handleChange} 
          name="email" 
          value={email}
          required/>

          <CssTextField
          required
          error={!valid}
          helperText={!valid?"Confirm Password":""}
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
          }
        />

        <CssTextField
        required
        error={!valid}
        helperText={!valid?"Confirm Password":""}
        label="Confirm password"
        id="Confirm password"
        type={showpwd ? 'text' : 'password'}
        onChange={handleChange} 
        name="confirm_Password" 
        value={confirm_Password}
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
        }
      />

        <FormGroup>
        <FormControlLabel control={<Checkbox />} label="I agree to the Terms and Condition." sx={{ 'MuiTypography-root':{fontSize:10},'& .MuiSvgIcon-root': { fontSize: 16 } }}/>
        <FormControlLabel control={<Checkbox />} label="I agree to Promotional messages."  sx={{ 'MuiTypography-root':{fontSize:10},'& .MuiSvgIcon-root': { fontSize: 16 } }}/>
        </FormGroup>

        <div className='w-full flex justify-center items-center'>
        <Buttons variant="contained" style={SubmitBtn} text="Sign Up" type="submit" disable={!valid}/>
        </div>

        </form>

      </div>
      <Notifications open={open} setOpen={setOpen} text={errMsg} severity="error" />
   <Outlet />
  </div>
  )
}

export default SignUp;
