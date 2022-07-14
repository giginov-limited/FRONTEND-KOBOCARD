import { useSelector } from "react-redux/es/exports"
import { useState } from "react";
import './accountpage.styles.scss'


const AccountPage = () => {
 
    const user = useSelector((state)=> state.auth.user);
    
    const [formFields, setFormFields] = useState(user)
    const {address_one, address_two, country, email, firstName, id, lastName, phone, state} = formFields

    const handleChange = (event) => {
        const {name, value} = event.target;
     
         setFormFields({...formFields,[name]: value});
       };

    return(
        <div className='Profile-container'>
            <h1>Account Information</h1>

            <div className="Profile-img">
              <img src="#" alt="Profile Img"/>
              <input type='file' placeholder="Change Profile Image" />
            </div>
           <form className='form-styles' >
          <div className='inputs'>
            <label>First Name</label>
          <input
            placeholder={user.first_name} 
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
            placeholder={user.last_name} 
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
            placeholder={user.email} 
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
          <input
            placeholder={user.state} 
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
            placeholder={user.country} 
            type='text'
            value ={country}
            onChange={handleChange}
            autoComplete='off'
            name='address_one'
            />

            </div>
          <button type='submit'> Update Info </button>
         </form>
        </div>
    )
}

export default AccountPage
