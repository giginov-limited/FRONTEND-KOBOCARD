import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import nav from '../assets/home.jpg'
import Buttons from './Button';
import { useNavigate } from 'react-router-dom';

const menuStyle={
  color:"black",
}
const btnStyles={
  color:"#FFF",
}

const loginBtnStyle = {
  border: "1px solid #EAC95F",
  color:"white",
  width: "76px",
  height: "32px",
  borderRadius:"40px",
  "&:hover":{
    border: "1px solid #EAC95F",
  }
}

const SignUpBtnStyle = {
  background: "#DAB641",
  // width: "100px",
  height: "33px",
  color:"white",
  borderRadius:"40px",
}

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClick = (anchor) =>{
    toggleDrawer(anchor, false)
  }

  const navigate = useNavigate();
  const navigateToSignInPage = ()=>{
    navigate('/sign-in')
  }
  const navigateToSignUpPage = ()=>{
    navigate('/sign-up')
  }

  const list = (anchor) => (
    <div className='text-white'>
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <div className='flex flex-col justify-between items-center py-12 w-full h-screen'>

    <div className='flex flex-col gap-6 '>
    <Buttons variant='text' style={btnStyles} text="Live Games" />
    <Buttons variant='text' style={btnStyles} text='Help'/>
    <Buttons variant='text' style={btnStyles} text='Contact Us'/>
    </div>

    <div className='flex flex-col justify-center items-center gap-6'>
    <Buttons variant='outlined' style={loginBtnStyle} text='Login' onClick={navigateToSignInPage}/>
    <Buttons variant='outlined' style={SignUpBtnStyle} text='Create Account' size='large' onClick={navigateToSignUpPage}/>
    </div>

    </div>
    </Box>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <div key={anchor} className='relative'>
          <Button onClick={toggleDrawer(anchor, true)}><MenuSharpIcon color='primary' sx={menuStyle}/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
          <img src={nav} className='absolute w-full h-full object-none object-left filter brightness-50 ' alt=''/>
            {list(anchor)}
          </SwipeableDrawer>
        </div>
      ))}
    </div>
  );
}
