import { useUpdateUserImageMutation,useGetUserDetailsQuery } from "../../app/api/authApiSlice";
import { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";

const UpdateBtn = ({id}) => {
    const [imageSelected, setImageSelected] = useState(null);
    const [updateUserImage] = useUpdateUserImageMutation();
    const {refetch} = useGetUserDetailsQuery()

    const hiddenFileInput = useRef(null);

    const uploadImage = async() => {
      hiddenFileInput.current.click()

      // if(imageSelected){

      //     const formData = new FormData();
      //     formData.append('file', imageSelected);
      //     formData.append('upload_preset', 'drbopy76');
    
      //    try{
      //     await axios.post(
      //        " https://api.cloudinary.com/v1_1/kobocard/image/upload", formData
      //      ).then((res)=> {
      //         updateUserImage({id,'picture_url':res.data.secure_url}).unwrap()
      //         refetch()
      //         setImageSelected(null)
      //      });
    
      //    }catch(error){
      //     console.log(error)
      //    }
      // }
  };

   

    const onChangeImageHandler = async(e) =>{
        setImageSelected(e.target.files[0])

            const formData = new FormData();
            formData.append('file', imageSelected);
            formData.append('upload_preset', 'drbopy76');

           try{
              await axios.post(
               " https://api.cloudinary.com/v1_1/kobocard/image/upload", formData
             ).then((res)=> {
                updateUserImage({id,'picture_url':res.data.secure_url}).unwrap()
                refetch()
                setImageSelected(null)
             });
      
           }catch(error){
            console.log(error)
           }
    }



    return(

        <div>
        <button 
        onClick={uploadImage}
        className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >Change Profile Image</button>
        <input 
        type='file'
        ref={hiddenFileInput}
        onChange={onChangeImageHandler}
        className='appearance-none hidden w-[200px] text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none'
        />

        </div>
    )
}

export default UpdateBtn