import { useParams } from "react-router-dom"
import {useNavigate} from 'react-router-dom';
import { useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Loading from "../../components/Loading/Loading.Component";
import Notifications from "../../components/Notification";
import Buttons from "../../components/Button";
import { useResetPasswordMutation } from "../../app/api/authApiSlice";



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
  
  
  const submitBtnStyle = {
    background: "#008092",
    padding:"10 40px",
    borderRadius: "50px",
    "&:hover":{
      backgroundColor: "rgba(0, 128, 146, 0.9)"
    }
  }



function ForgotPassword(){
    const {id} = useParams()
    const [errMsg, setErrMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [showpwd, setShowpwd] = useState(false)
  
    const handleClickShowPassword = () => {
      setShowpwd(!showpwd)
    };
  
    //Default fields for input fields and DB
    const defaultformfields = {
        password:'',
        confirm_password:'',
        token:id,
      }
    
    //Reactive values for input fields change
    const [formFields, setFormFields] = useState(defaultformfields);
    const { confirm_password, password} = formFields;
    
    //Navigation handler
    const navigate = useNavigate();
  
    //Navigation function to different pages
    const navigateToSignInPage = () => {navigate('/signIn')}
      
    
    //reset formfeilds 
     const resetFormfields = () => {
          setFormFields(defaultformfields);
      }
  
    // Redux hooks handler
    const [login, {isLoading}] = useResetPasswordMutation()

  
   //Error message handler
    useEffect(()=> {
        setErrMsg('')
    },[formFields])
  
    //handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try{
            await login(formFields).unwrap()
            resetFormfields();
            navigateToSignInPage()
        }catch(err) {
          if(err?.data){
            setOpen(true)
            setErrMsg(err.data.error.Message)
          }if(err.status){
            setOpen(true)
            setErrMsg(err.status)
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
          <div className='bg-white h-[480px] w-[90%] md:w-[700px] rounded-lg shadow-md flex flex-col items-center'>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
                    Sign In
                  </h2>
                </div>
  
                <form className="mt-8 space-y-6 w-full md:w-[462px] flex flex-col"  onSubmit={handleSubmit} >
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

              <CssTextField
              required
              label="Confirm Password"
              id="password"
              type={showpwd ? 'text' : 'password'}
              onChange={handleChange} 
              name="confirm_password" 
              value={confirm_password}
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

                  <div>
                    <Buttons variant="contained" style={submitBtnStyle} text="Reset Password" type="submit" />
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

export default ForgotPassword