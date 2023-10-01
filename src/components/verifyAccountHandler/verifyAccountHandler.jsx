import React, { useState } from 'react'
import { Modal, TextField } from '@mui/material'
import Buttons from '../Button'
import { useGenerateOtpMutation, useValidateOtpMutation } from '../../app/api/authApiSlice'
import { LoadingButton } from '@mui/lab'
import Notifications from '../Notification'



const OTPbuttonStyle = {
    border:"1px solid #008092",
    color: "#008092",
    borderRadius: "10px",
    padding: "12px",
    width: "150px",
    "&:hover":{
      opacity:0.9,
      color:"#FFFFF"
    }
  }

function VerifyAccountHandler() {
    const [NotifyOpen, setNotifyOpen] = useState(false);
    const [text, setText] = useState('');
    const [severity, setSeverity] = useState('');


    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    const [sendOtp, {isLoading, error}] = useGenerateOtpMutation()
    const [verifyOtp] = useValidateOtpMutation()

    const [otpNumber, setOtpNumber] = useState("")
    const onClickHandler = async() => {
        try {
            await sendOtp()
            setText("Successfully sent OTP")
            setSeverity("success")
            setNotifyOpen(true)
            handleOpen()
            
        }catch (err) {
            console.log(error)
            setText("An Error Occured")
            setSeverity("error")
            setNotifyOpen(true)
        }
    }
    const onChangeHandler = (e) => {
        e.preventDefault()
        setOtpNumber(e.target.value)
    }

    const onSubmitHandler =async () => {
        
        try {
            await verifyOtp(otpNumber)
            setText("Successfully verified Account")
            setSeverity("success")
            setNotifyOpen(true)
            handleClose()
            
        }catch (err) {
            console.log(error)
            setText("Inaild Otp")
            setSeverity("error")
            setNotifyOpen(true)
        }
    }
  return (
    <div>
        <LoadingButton variant="outlined" onClick={onClickHandler} loading={isLoading} loadingIndicator="Loading..."><span className='capitalize font-inter tracking-wider text-xsm md:text-xmm lg:text-sm'>Verify account</span></LoadingButton>
        <Modal
        open={open}
        onClose={handleClose}
        >
            <div className="flex flex-col justify-center items-center gap-2 h-full p-3 ">
                <div className="w-[552px] p-12 bg-white rounded-xl flex flex-col justify-center items-center">
                    <OtpVerificationHandler value={otpNumber} setValue={onChangeHandler} submit={onSubmitHandler} />
                </div>
            </div>
        </Modal>
        <Notifications open={NotifyOpen} setOpen={setNotifyOpen} text={text} severity={severity}/>
    </div>
  )
}

function OtpVerificationHandler ({value, setValue, submit}) {

    return (
        <div className='w-full p-4 flex flex-col gap-6 justify-center'>
            <p className='font-inter font-medium text-2xl'>Otp Number</p>
            <TextField
            id="input-with-icon-textfield"
            size="large"
            multiline
            fullWidth
            value={value}
            name="number"
            type='number'
            onChange={setValue} 
            variant="standard"
        />
        <Buttons style={OTPbuttonStyle} variant="outlined" text="Submit" onClick={submit} />
        </div>
    )
}


export default VerifyAccountHandler

