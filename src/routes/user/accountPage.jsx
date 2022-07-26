import { useSelector } from "react-redux/es/exports"
import { Image } from "cloudinary-react";
import { useState } from "react";
import './accountpage.styles.scss'
import axios from "axios";
import { useUpdateUserDetailsMutation,useGetUserDetailsQuery,useUpdateUserImageMutation } from "../../app/api/authApiSlice";


const AccountPage = () => {

    const {data, isLoading,isSuccess, isError,refetch} = useGetUserDetailsQuery();
    const user = data?.user;
  
     const [updateUser] = useUpdateUserDetailsMutation();
     const [updateUserImage] = useUpdateUserImageMutation();
     
     const defaultformfields = {
       address_one: "",
      address_two: "",
      country: "",
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      picture: '',
      state: ""
    }

    const [formFields, setFormFields] = useState(isSuccess?user:isError?refetch():defaultformfields)
    console.log(user)
    const {address_one, address_two, country, email, firstName, lastName, phone, state, id} = formFields
    console.log(formFields)
    
    const [imageSelected, setImageSelected] = useState(null)
    const [imageUrl, setImageUrl] = useState(data?data.user.picture:'')

    const onChangeImageHandler = (e) =>{
      setImageSelected(e.target.files[0])
    }

    const uploadImage = async() => {
      const formData = new FormData();
      formData.append('file', imageSelected);
      formData.append('upload_preset', 'drbopy76');
      const {id} = data.user

     try{
      await axios.post(
         " https://api.cloudinary.com/v1_1/kobocard/image/upload", formData
       ).then((res)=> {
         setImageUrl(res.data.secure_url)
         const responce = updateUserImage({id,picture_url:res.data.secure_url}).unwrap()
         console.log(responce)
         refetch()
       });

     }catch(error){
      console.log(error)
     }
    };

    let image = isLoading||isError?"https://res.cloudinary.com/kobocard/image/upload/v1658695490/sv1m2penyqmbzemh8bna.jpg":data.user.picture
    


    const updateHandler = async(e) => {
      e.preventDefault()
      const {id} = data.user

      console.log({...formFields,id})
      try{
        await updateUser({...formFields,id})
      }catch(err){
        console.log(err)
      }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

         setFormFields({...formFields,[name]: value});
       };
    


      let content = isLoading?<h1>loading</h1>:
      isSuccess?(
        <>
          <h1>Account Information</h1>

          <div className="Profile-img">
           <Image cloudName='kobocard' publicId={image} className='image'  />
           <button onClick={uploadImage}>Upload Image</button>
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
              placeholder={data.user.first_name} 
              type='text'
              value ={firstName}
              onChange={handleChange}
              autoComplete='off'
              name='first_name'
              />
           </div>
           <div className='inputs'>
              <label>last Name</label>
              <input
              placeholder={data.user.last_name} 
              type='text'
              value ={lastName}
              onChange={handleChange}
              autoComplete='off'
              name='last_name'
              />

            </div>
            <div className='inputs'>
              <label>Email</label>
              <input
              placeholder={data.user.email} 
              type='email'
              value ={email}
              onChange={handleChange}
              autoComplete='off'
              name='email'
              />
            </div>
            <div className='inputs'>
              <label>Phone Number</label>
              <input
              placeholder={data.user.phone} 
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
              placeholder={data.user.address_two}
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
              placeholder={data.user.address_one} 
              type='text'
              value ={address_one}
              onChange={handleChange}
              autoComplete='off'
              name='address_one'
              />
            </div>
            <div className='inputs'>
              <label>State</label>
              <input
              placeholder={data.user.state} 
              type='text'
              value ={state}
              onChange={handleChange}
              autoComplete='off'
              name='state'
              />
            </div>

            <div className='inputs'>
              <label>Country</label>
              <input
              placeholder={data.user.country} 
              type='text'
              value ={country}
              onChange={handleChange}
              autoComplete='off'
              name='country'
              />
            </div>

            <button type='submit' onClick={updateHandler}> Update Info </button>
         </form>


        </>
      ): refetch();

    return(
        <div className='Profile-container'>
            {content}
        </div>
    )
}

export default AccountPage
