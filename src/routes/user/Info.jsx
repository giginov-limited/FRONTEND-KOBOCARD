import { useState } from "react";
import './accountpage.styles.scss'
import { Country,State} from "country-state-city";
import { useUpdateUserDetailsMutation} from "../../app/api/authApiSlice";
import { useEffect } from "react";
import UpdateBtn from "../../components/Display-Picture/Update-Picture";

const Info = ({value}) => {
    const [message, setMessage] = useState(null)

    const user = value[0].user

     const [updateUser] = useUpdateUserDetailsMutation();

     useEffect(()=>{
      setTimeout(() => setMessage(''), 3000)
     },[message])
  

    const [formFields, setFormFields] = useState(user)
    const {address_one, address_two,phone,state,country} = formFields
    

    const countries = Country.getAllCountries()
    const getStates = State.getStatesOfCountry(country)

   
    const updateHandler = async(e) => {
      e.preventDefault()
      const {id} = user

      try{
       const res = await updateUser({...formFields,id}).unwrap()
       setMessage(res.message)
      }catch(err){
        console.log(err)
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

            {message?<span className="updated-msg">{message}</span>:null}
          <div className="flex gap-2 py-6 items-center">
            <img src={user.picture} alt=""  className="h-44 w-44 rounded-full"/>
            <UpdateBtn {...user}/>
          </div>
          <form className='flex flex-col text-left font-inter w-[600px] gap-4 '>
            <div className="flex items-center text-lg border border-border-bg p-1">
              <label className="text-sm">First Name: </label>
              <input
              placeholder={user.first_name} 
              type='text'
              autoComplete='off'
              name='first_name'
              className="ml-3 text-lg placeholder-black focus:outline-none focus:border-none"
              />
           </div>
           <div className='flex items-center text-lg border border-border-bg p-1 '>
              <label className="text-sm">Last Name: </label>
              <input
              placeholder={user.last_name} 
              type='text'
              autoComplete='off'
              name='last_name'
              className="ml-3 text-lg placeholder-black focus:outline-none focus:border-none"
              />

            </div>
            <div className='flex items-center text-lg border border-border-bg p-1 '>
              <label className="text-sm">Email: </label>
              <input
              placeholder={user.email} 
              type='email'
              autoComplete='off'
              name='email'
              className="ml-3 text-lg placeholder-black focus:outline-none focus:border-none"
              />
            </div>
            <div className='flex items-center text-lg border border-border-bg p-1 '>
              <label className="text-sm">Phone Number: </label>
              <input
              placeholder={user.phone} 
              type='number'
              value ={phone}
              onChange={handleChange}
              autoComplete='off'
              name='phone'
              className="ml-3 text-lg placeholder-black focus:outline-none focus:border-none"
              />
            </div>
            <div className='flex items-center text-lg border border-border-bg p-1 '>
              <label className="text-sm">Address One: </label>
              <input
              placeholder={user.address_two}
              type='text'
              value ={address_two}
              onChange={handleChange}
              autoComplete='off'
              name='address_two'
              className="ml-3 text-lg placeholder-black focus:outline-none focus:border-none"
              />
            </div>
            <div className='flex items-center text-lg border border-border-bg p-1 '>
              <label className="text-sm">Address Two: </label>
              <input
              placeholder={user.address_one} 
              type='text'
              value ={address_one}
              onChange={handleChange}
              autoComplete='off'
              name='address_one'
              className="ml-3 text-lg placeholder-black focus:outline-none focus:border-none"
              />
            </div>


            <div className='inputs'>
              <label>State</label>
              <select 
              value={state}
              name='state'
              onChange= {handleChange}
              className= "border border-b-black rounded"
              > 
                <option>{user.state}</option>
                {getStates.map((state)=>{ return <option value={state.name} key={state.isoCode}>{state.name}</option>})}
              </select>
            </div>

            <div className='inputs'>
              <label>Country</label>
              <select
              value={country}
              name='country'
              onChange= {handleChange}
              className= "border border-b-black rounded"
                >
                <option>{user.country}</option>
                {countries.map((country)=> {return <option value={country.isoCode} key={country.isoCode} name='country' >{country.name}</option>})}
              </select>
            </div>

            <button 
            type='submit' 
            onClick={updateHandler}
            className='w-[200px] text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            > Update Info </button>
         </form>
        </>
        </div>
    )
}

export default Info

