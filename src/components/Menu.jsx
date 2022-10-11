import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Buttons from './Button';
import DisplayPicture from './Display-Picture/display-Picture';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/authSlice';

const btnStyles = {
    background: "linear-gradient(141.35deg, #EAC95F 24.34%, #F1B151 77.78% )",
    borderRadius: "10px",
    "&:hover":{
        background:"linear-gradient(141.35deg, #EAC95F 24.34%, #F1B151 77.78% )",
    }
}

const styles = {
    width: "40px",
    height: "40px",
}

export default function AccountMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigateToWalletPage = () => navigate('/wallet')
  const navigateToAccountPage = () => navigate('/account')
  const navigateToKardHistory = () => navigate('/game-history')
  const navigateToDashboard = () => navigate('/dashboard')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const logOuthandler = () => {
    dispatch(logOut())
  }
  return (
    <React.Fragment>

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'}}>
      <Buttons variant={"contained"} style ={btnStyles} text="wallet" onClick={navigateToWalletPage} />
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
          <DisplayPicture styles={styles}/>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 40,
              height: 40,
              ml: -0.5,
              mr: 1,
            }
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={navigateToAccountPage}  sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: "10px"}}>
        <DisplayPicture styles={{width:"30px", height:"30px"}} />  My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={navigateToDashboard}>
          <ListItemIcon>
            <GridViewRoundedIcon fontSize='small' sx={{color:"#008092",}} />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={navigateToKardHistory}>
          <ListItemIcon>
            <RestoreRoundedIcon fontSize="small" sx={{color:"#008092",}}/>
          </ListItemIcon>
          Draw History
        </MenuItem>
        <MenuItem onClick={logOuthandler}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{color:"#008092",}}/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}