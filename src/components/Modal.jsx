import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: "300px",
  bgcolor: 'background.paper',
  p: 4,
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
  boxShadow: "6px 6px 7px 3px rgba(0, 0, 0, 0.25)",
  borderRadius: "20px"
};

export default function TransitionsModal({open,handleClose,id,message}) {

 return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <CheckCircleRoundedIcon  sx={{ fontSize: 80 }} color="success" />
          <p className='text-lg text-nav-bg'>Success</p>
          <p className='text-xs text-nav-bg'>Ticket No:{id}</p>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}