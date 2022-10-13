import Button from '@mui/material/Button';


export default function Buttons({variant,style,text,onClick,type,disable,size}){
    disable = disable ? disable : false;
    return (
        <Button variant={variant} sx={style} onClick={onClick} type={type} disabled={disable} size={size}><span className='capitalize'>{text}</span></Button>
    )
}