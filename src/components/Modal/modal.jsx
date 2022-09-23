import { motion } from "framer-motion";
import succ from '../../assets/succ.gif'

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible:{
        y: "0",
        opacity:1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        }
    },
    exit:{
        y: "100vh",
        opacity:0,
    }
}


const Modal = ({open,onClose}) => {
    if(!open) return null;

    
    return (
        <motion.div 
        className="absolute top-0 h-screen w-full bg-dark-bg text-white font-inter flex justify-center"
        initial={{opacity:0}}
        animate= {{opacity:1}}
        exit={{opacity:0}}
        >
            <button onClick={onClose}>
                click Me!
            </button>
            <motion.div
            onClick={(e) => {
                e.stopPropagation()
            }}
            className='h-[150px] w-[250px] absolute top-1/4'
            variants={dropIn}
            >
            <img className="rounded-lg my-4" src={succ} alt="" />
            Successful!
            </motion.div>
        </motion.div>
    )
}

export default Modal