import './pagenatio.style.scss';

const Pagination = ({postsPerPage,totalPosts, paginate}) => {

    const pageNumbers = [];
    for(let i =1; i <=Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return(

        <nav className='pagenation-wrapper'>
            <ul>
               {pageNumbers.map(number => (
                <li key={number} >
                    <button onClick={() => paginate(number)}>
                        <a>{number}</a>
                    </button>
                </li>
               ))}
            </ul>
        </nav>
    )
}
 
export default Pagination