import pic from '../../assets/404.svg'

const NotFound =()=>{
    const content = 
    <div className='flex justify-center items-center gap-3'>
        <img src={pic} alt="" />
        <div className='max-w-[482px]'>
            <p className='text-9xl text-register-btn font-bold my-8'>Oops!</p>
            <p className='text-4xl font-light my-2'>404 - PAGE NOT FOUND </p>
            <p className='text-sm'>The page you are looking for  might have been removed,had its name changed or is temporraily not available.</p>
        </div>
    </div>
    return content
}

export default NotFound