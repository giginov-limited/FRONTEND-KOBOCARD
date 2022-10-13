import { useState } from "react";
import { Country,State} from "country-state-city";
import { useUpdateUserDetailsMutation} from "../../app/api/authApiSlice";
import UpdateBtn from "../../components/Display-Picture/Update-Picture";
import DisplayPicture from "../../components/Display-Picture/display-Picture";
import Buttons from "../../components/Button";
import Notifications from "../../components/Notification";
import { useDispatch } from "react-redux";
import { setTimeOutMsg } from "../../features/authSlice";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';

const updateStyle = {
  backgroundColor: "#008092",
  borderRadius: "10px",
  padding: "12px",
  "&:hover":{
    background: "#008092",
    opacity:0.9,
  }
}

const changePasswordStyle = {
  border:"1px solid #008092",
  color: "#008092",
  borderRadius: "10px",
  padding: "12px",
  "&:hover":{
    opacity:0.9,
    color:"#FFFFF"
  }
}


const styles = {
  width: "195px",
  height: "195px",
  border: "7px solid #008092",
}




const Info = ({value}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [severity, setSeverity] = useState('');

  const dispatch = useDispatch()

  const disHandler = () => {
    dispatch(setTimeOutMsg("nawaaaa"))
  }
  

  const user = value[0].user

  //Update user Handler
  const [updateUser] = useUpdateUserDetailsMutation();
  
  //formFields db
  const [formFields, setFormFields] = useState(user)
  const {address_one, address_two,phone,state,country} = formFields
  console.log(formFields)

  //Get country&states handler
  const countries = Country.getAllCountries()
  const getStates = State.getStatesOfCountry(country)

  //Update func 
  const updateHandler = async(e) => {
    
  e.preventDefault()
    const {id} = user

    try{
      await updateUser({...formFields,id}).unwrap()
      setText("Update Successful")
      setSeverity("success")
      setOpen(true)
    }catch(err){
        console.log(err)
        setText("An Error Occured")
        setSeverity("error")
        setOpen(true)
      }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields,[name]: value});
  };

    return(
        <div className='w-full flex flex-col justify-center items-center'>
           <>
              <h1 className="text-2xl font-inter">Account Information</h1>
              <div className="flex gap-2 py-6 items-center self-start w-full">
                <div className="w-[90%] max-w-[750px] mx-auto flex items-center gap-6">
                  <DisplayPicture styles={styles}/>
                  <UpdateBtn {...user}/>
                </div>
              </div>

              <div className="w-full">
                <form className='w-[90%] max-w-[750px] mx-auto gap-6 text-left flex flex-col my-6'>
                <TextField
                id="input-with-icon-textfield"
                label="FullName"
                size="large"
                multiline
                fullWidth
                value={user.first_name+ ' ' + user.last_name}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

                <TextField
                id="input-with-icon-textfield"
                label="Email"
                size="large"
                multiline
                fullWidth
                value={user.email}
                name="email"
                type='email' 
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

                <TextField
                id="input-with-icon-textfield"
                label="Phone"
                size="large"
                multiline
                fullWidth
                value={phone}
                name="phone"
                type='number'
                onChange={handleChange} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

                <TextField
                id="input-with-icon-textfield"
                label="Address"
                size="large"
                multiline
                fullWidth
                value={address_one}
                name="address_one"
                type='text'
                onChange={handleChange} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                     <HomeIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

                <TextField
                id="input-with-icon-textfield"
                label="Address"
                size="large"
                multiline
                fullWidth
                value={address_two}
                name="address_two"
                type='text'
                onChange={handleChange} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                     <HomeIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

              <TextField
              id="outlined-select-currency"
              select
              size='medium'
              label="Country"
              name='country'
              value={country}
              onChange={handleChange}
              helperText="Please select your country"
            >
              {countries.map((country) => (
                <MenuItem key={country.isoCode} value={country.isoCode} name='country'>
                {country.name}
                </MenuItem>
              ))}
            </TextField>

              <TextField
              id="outlined-select-currency"
              select
              size='medium'
              label="State"
              name='state'
              value={state}
              onChange={handleChange}
              helperText="Please select your state"
            >
              {getStates.map((state) => (
                <MenuItem key={state.isoCode} value={state.isoCode} name='country'>
                {state.name}
                </MenuItem>
              ))}
            </TextField>

                  <div className="flex justify-start items-center gap-6">
                    <Buttons style={updateStyle} variant="contained" text="Update Information" onClick={updateHandler} />
                    <Buttons style={changePasswordStyle} variant="outlined" text="Change Password"  onClick={disHandler}/>
                  </div>
                </form>
              </div>
              <Notifications open={open} setOpen={setOpen} text={text} severity={severity}/>
            </>
      </div>
    )
}

export default Info

