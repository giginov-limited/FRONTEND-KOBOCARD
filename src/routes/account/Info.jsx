import { useState } from "react";
import { Country,State} from "country-state-city";
import { useUpdateUserDetailsMutation} from "../../app/api/authApiSlice";
import { useEffect } from "react";
import UpdateBtn from "../../components/Display-Picture/Update-Picture";
import DisplayPicture from "../../components/Display-Picture/display-Picture";
import Buttons from "../../components/Button";
import Notifications from "../../components/Notification";

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
  border: "7px solid #16AE25",
}




const Info = ({value}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [severity, setSeverity] = useState('');
  

  const user = value[0].user

  //Update user Handler
  const [updateUser] = useUpdateUserDetailsMutation();
  
  //formFields db
  const [formFields, setFormFields] = useState(user)
  const {address_one, address_two,phone,state,country} = formFields

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
                <div className="w-[70%] mx-auto flex items-center gap-6">
                  <DisplayPicture styles={styles}/>
                  <UpdateBtn {...user}/>
                </div>
              </div>

              <div className="w-full">
                <form className='w-[70%] mx-auto gap-2 text-left '>
                  <div className="flex items-center text-lg p-2  hover:shadow-2xl hover:rounded-b-md  ">
                    <label className="text-xl font-semibold ">Name: </label>
                      <input
                      placeholder={user.first_name+ ' ' + user.last_name} 
                      type='text'
                      autoComplete='off'
                      name='first_name'
                      className="ml-3 text-lg capitalize tracking-wide font-inter  placeholder-black bg-transparent w-full focus:outline-none focus:border-none"
                      />
                  </div>

                  <div className='flex items-center text-lg p-2 hover:shadow-2xl hover:rounded-b-md  '>
                    <label className="text-xl font-semibold ">Email: </label>
                    <input
                    placeholder={user.email} 
                    type='email'
                    autoComplete='off'
                    name='email'
                    className="ml-3 text-lg  tracking-wide font-inter  placeholder-black bg-transparent w-full focus:outline-none focus:border-none"
                    />
                  </div>

                  <div className='flex items-center text-lg p-2 hover:shadow-2xl hover:rounded-b-md w-full '>
                    <label className="text-xl font-semibold ">Phone: </label>
                      <input
                      placeholder={user.phone} 
                      type='number'
                      value ={phone}
                      onChange={handleChange}
                      autoComplete='off'
                      name='phone'
                      className="appearance-none ml-3 text-lg capitalize tracking-wide font-inter  placeholder-black bg-transparent w-full focus:outline-none focus:border-none"
                    />
                  </div>

                  <div className='flex items-center text-lg p-2 hover:shadow-2xl hover:rounded-b-md  '>
                    <label className="text-xl font-semibold ">Address: </label>
                      <input
                        placeholder={user.address_two}
                        type='text'
                        value ={address_two}
                        onChange={handleChange}
                        autoComplete='off'
                        name='address_two'
                        className="ml-3 text-lg capitalize tracking-wide font-inter  placeholder-black bg-transparent w-full focus:outline-none focus:border-none"
                        />
                  </div>


                  <div className='flex items-center text-lg p-2 hover:shadow-2xl hover:rounded-b-md  '>
                    <label className="text-xl font-semibold ">Address: </label>
                      <input
                        placeholder={user.address_one} 
                        type='text'
                        value ={address_one}
                        onChange={handleChange}
                        autoComplete='off'
                        name='address_one'
                        className="ml-3 text-lg capitalize tracking-wide font-inter  placeholder-black bg-transparent w-full focus:outline-none focus:border-none"
                      />
                  </div>

                  <div className='inputs p-2 hover:shadow-2xl'>
                    <label className="text-lg font-semibold">State</label>
                    <select 
                      value={state}
                      name='state'
                      onChange= {handleChange}
                      className= "appearance-none mx-2 text-lg bg-transparent "
                    > 
                        <option>{user.state}</option>
                          {getStates.map((state)=>{ return <option value={state.name} key={state.isoCode}>{state.name}</option>})}
                    </select>
                  </div>

                  <div className='inputs p-2 hover:shadow-2xl bg-transparent'>
                    <label className="text-lg font-semibold">Country</label>
                    <select
                      value={country}
                      name='country'
                      onChange= {handleChange}
                      className= "appearance-none mx-2 text-lg"
                    >
                      <option>{user.country}</option>
                        {countries.map((country)=> {return <option value={country.isoCode} key={country.isoCode} name='country' className="py-1 rounded-md">{country.name}</option>})}
                    </select>
                  </div>

                  <div className="flex justify-start items-center gap-6">
                    <Buttons style={updateStyle} variant="contained" text="Update Information" onClick={updateHandler} />
                    <Buttons style={changePasswordStyle} variant="outlined" text="Change Password"  />
                  </div>
                </form>
              </div>
              <Notifications open={open} setOpen={setOpen} text={text} severity={severity}/>
            </>
      </div>
    )
}

export default Info

