// import './pagenatio.style.scss';

import { useState,useEffect } from "react";

const Pagination = ({postsPerPage,totalPosts, paginate,currentPage}) => {

    //pageNumbers store for numbers of pages, e.g [1,2,3] .
    const pageNumbers = [];
    //Loops adds number to the array
    for(let i =1; i <=Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    //Current Page Number
    const [currentPageNumber, setCurrentPageNumber] = useState(currentPage)
    const [noOfPageNumbersPerPage,setNoOfPageNumbersPerPage] = useState(3)
    const [disable, setDisable] = useState(true)
    const [disable2, setDisable2] = useState(true)

    const indexOfLastPage = currentPageNumber * noOfPageNumbersPerPage
    // //var for first post of a page
    // const indexOfFirstPost = indexOfLastPost - postsperpage;
    const indexOfFirstPage = indexOfLastPage - noOfPageNumbersPerPage

           const num = pageNumbers.slice(indexOfFirstPage,indexOfLastPage)
        

        useEffect(()=>{
            if(currentPageNumber >= Math.ceil(pageNumbers.length/noOfPageNumbersPerPage)){
                setDisable(false)
            }else(
                setDisable(true)
            )
            if(currentPageNumber <= 1){
                setDisable2(false)
            }else(
                setDisable2(true)
            )
        }
            ,[currentPageNumber])

        const onChangeHandler1 = () => {
            setCurrentPageNumber(currentPageNumber - 1)
        }
        const onChangeHandler2 = () => {
            setCurrentPageNumber(currentPageNumber + 1)
        }

    
    

    return(

        <nav className='my-6 flex justify-center gap-6'>
            {disable2 && <button onClick={onChangeHandler1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            </button>}
            <ul className="flex justify-center items-center gap-2">
               {num.map(number => (
                <li key={number} >
                    <button onClick={() => paginate(number)}>
                        {currentPage === number ?  <a className='bg-red-300 text-white text-lg p-2 rounded-full hover:shadow-md'>{number}</a> :  <a className='text-lg p-2 rounded-full hover:shadow-md'>{number}</a>}
                    </button>
                </li>
               ))}
            </ul>
            {disable && <button onClick={onChangeHandler2} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            </button>}
        </nav>
    )
}
 
export default Pagination