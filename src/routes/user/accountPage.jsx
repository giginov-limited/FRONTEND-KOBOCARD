import { Image } from "cloudinary-react";
import { useState } from "react";
import './accountpage.styles.scss'
import axios from "axios";
import { Country,State} from "country-state-city";
import { useUpdateUserDetailsMutation,useGetUserDetailsQuery,useUpdateUserImageMutation } from "../../app/api/authApiSlice";
import { useEffect } from "react";



const Info = ({value}) => {
  console.log(value)

    const [message, setMessage] = useState(null)

    const user = value[0].user
    const refresh = value[1]
    console.log(refresh)
    const {refetch} = useGetUserDetailsQuery()
     const [updateUser] = useUpdateUserDetailsMutation();
     const [updateUserImage] = useUpdateUserImageMutation();

     useEffect(()=>{
      setTimeout(() => setMessage(''), 3000)
     },[message])
  

    const [formFields, setFormFields] = useState(user)
    const {address_one, address_two,phone,state,country} = formFields
    
    const [imageSelected, setImageSelected] = useState(null)

    const countries = Country.getAllCountries()
    const getStates = State.getStatesOfCountry(country)

    const onChangeImageHandler = (e) =>{
      setImageSelected(e.target.files[0])
    }

    const uploadImage = async() => {
      const formData = new FormData();
      formData.append('file', imageSelected);
      formData.append('upload_preset', 'drbopy76');
      const {id} = user

     try{
      await axios.post(
         " https://api.cloudinary.com/v1_1/kobocard/image/upload", formData
       ).then((res)=> {
        const responce= updateUserImage({id,'picture_url':res.data.secure_url}).unwrap()
         setMessage(responce.message)
         refresh()
         console.log('updated')
       });

     }catch(error){
      console.log(error)
     }
    };

    let image = (user.picture == '')?"https://res.cloudinary.com/kobocard/image/upload/v1658695490/sv1m2penyqmbzemh8bna.jpg":user.picture
    


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
        <div className='Profile-container'>

            <>
          <h1>Account Information</h1>

            {message?<span className="updated-msg">{message}</span>:null}
          <div className="Profile-img">
           <Image cloudName='kobocard' publicId={image} className='image'  />
           <button onClick={uploadImage} >Change Profile Image</button>
           <input 
           type='file'
           className="image-input"
           onChange={onChangeImageHandler}
           />
          </div>
          <form className='form-styles' >
            <div className='inputs'>
              <label>First Name</label>
              <input
              placeholder={user.first_name} 
              type='text'
              autoComplete='off'
              name='first_name'
              />
           </div>
           <div className='inputs'>
              <label>last Name</label>
              <input
              placeholder={user.last_name} 
              type='text'
              autoComplete='off'
              name='last_name'
              />

            </div>
            <div className='inputs'>
              <label>Email</label>
              <input
              placeholder={user.email} 
              type='email'
              autoComplete='off'
              name='email'
              />
            </div>
            <div className='inputs'>
              <label>Phone Number</label>
              <input
              placeholder={user.phone} 
              type='number'
              value ={phone}
              onChange={handleChange}
              autoComplete='off'
              name='phone'
              />
            </div>
            <div className='inputs'>
              <label>Address One</label>
              <input
              placeholder={user.address_two}
              type='text'
              value ={address_two}
              onChange={handleChange}
              autoComplete='off'
              name='address_two'
              />
            </div>
            <div className='inputs'>
              <label>Address Two</label>
              <input
              placeholder={user.address_one} 
              type='text'
              value ={address_one}
              onChange={handleChange}
              autoComplete='off'
              name='address_one'
              />
            </div>
            <div className='inputs'>
              <label>State</label>
              <select 
              value={state}
              name='state'
              onChange= {handleChange}> 
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
                >
                <option>{user.country}</option>
                {countries.map((country)=> {return <option value={country.isoCode} key={country.isoCode} name='country' >{country.name}</option>})}
              </select>
            </div>

            <button type='submit' onClick={updateHandler}> Update Info </button>
         </form>


        </>
        </div>
    )
}




function AccountPage() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUserDetailsQuery(1)


  let postContent = isLoading?(<>
  <div>loadingg</div>
  </>):isSuccess?(<Info value={[data,refetch]}/>):
  console.log(isError)

  return( <div>{postContent}</div>)
}
export default AccountPage

