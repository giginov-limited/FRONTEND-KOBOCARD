import { useUpdateUserImageMutation,useGetUserDetailsQuery } from "../../app/api/authApiSlice";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useRef } from "react";
import axios from "axios";
import Notifications from "../Notification";

const UpdateBtn = ({id}) => {
    const [updateUserImage,{isLoading}] = useUpdateUserImageMutation();
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')
    const [open, setOpen] = useState(false)
    const {refetch} = useGetUserDetailsQuery()

    const hiddenFileInput = useRef(null);

    const uploadImage = async() => {
      hiddenFileInput.current.click()
  };

    const onChangeImageHandler = async(e) =>{
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('upload_preset', 'drbopy76');
      try{
          await axios.post(
              " https://api.cloudinary.com/v1_1/kobocard/image/upload", formData
          ).then((res)=> {
              updateUserImage({id,'picture_url':res.data.secure_url}).unwrap()
              refetch()
              setMessage("Successfully Updated Profile Picture.")
              setSeverity("success")
              setOpen(true)
          });
      
          }catch(error){
            setMessage("An Error Occured.")
            setSeverity("error")
            setOpen(true)
       }
    }



    return(

        <div>
        <LoadingButton
        size="medium"
        onClick={uploadImage}
        loading={isLoading}
        loadingIndicator="Uploading..."
        sx={{
            color:"#008092",
            '&:hover':{
                backgroundColor:"rgba(0, 128, 146, 0.1)",
            }
        }}
        variant="text"
        > Change Profile Image
        </LoadingButton>

        <input 
        type='file'
        ref={hiddenFileInput}
        onChange={onChangeImageHandler}
        className='appearance-none hidden w-[200px] text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none'
        />
        <Notifications open={open} severity={severity} text={message} setOpen={setOpen}/>
        </div>
    )
}

export default UpdateBtn