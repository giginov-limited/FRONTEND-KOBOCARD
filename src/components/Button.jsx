import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const  Btns = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0.7)
    },
  }));

export default function Buttons({variant,style,text,onClick,type,disable,size}){
    disable = disable ? disable : false;

    return (
        <Btns variant={variant} sx={style} onClick={onClick} type={type} disabled={disable} size={size}><span className='capitalize font-inter tracking-wider text-xs md:text-base'>{text}</span></Btns>
    )
}