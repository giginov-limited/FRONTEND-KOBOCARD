import Button from '@mui/material/Button';

export default function Buttons({variant,style,text,onClick}){
    return (
        <Button variant={variant} sx={style} onClick={onClick}><span className='capitalize'>{text}</span></Button>
    )
}