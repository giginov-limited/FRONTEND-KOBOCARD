import { useGetAllCardGamesQuery } from '../../app/api/authApiSlice';

const OngoingCardGames = () =>{

    return(
        <div className='bg-black p-10 my-12 font-inter'>
          <h2 className='text-white my-6 text-2xl '>ONGOING GAMES</h2>
        

        <div className='grid grid-cols-4 gap-5 space-y-4 '>

          <div className="bg-white text-black flex flex-col w-full h-[200px]  justify-around rounded-xl max-w-[275px] shadow-sm shadow-white ">
            <span>4,Plots of Land. Abuja</span>
            <span className='text-3xl font-semibold'>N35,000,000</span>
            <div>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">More Info</button>
                <button  className='hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >Play now</button>
            </div>
          </div>

          <div className="bg-white text-black flex flex-col w-full h-[200px]  justify-around rounded-xl max-w-[275px] shadow-sm shadow-white ">
            <span>4,Plots of Land. Abuja</span>
            <span className='text-3xl font-semibold'>N35,000,000</span>
            <div>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">More Info</button>
                <button  className='hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >Play now</button>
            </div>
          </div>

          <div className="bg-white text-black flex flex-col w-full h-[200px]  justify-around rounded-xl max-w-[275px] shadow-sm shadow-white ">
            <span>4,Plots of Land. Abuja</span>
            <span className='text-3xl font-semibold'>N35,000,000</span>
            <div>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">More Info</button>
                <button  className='hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >Play now</button>
            </div>
          </div>
          <div className="bg-white text-black flex flex-col w-full h-[200px]  justify-around rounded-xl max-w-[275px] shadow-sm shadow-white ">
            <span>4,Plots of Land. Abuja</span>
            <span className='text-3xl font-semibold'>N35,000,000</span>
            <div>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">More Info</button>
                <button  className='hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >Play now</button>
            </div>
          </div>
          <div className="bg-white text-black flex flex-col w-full h-[200px]  justify-around rounded-xl max-w-[275px] shadow-sm shadow-white ">
            <span>4,Plots of Land. Abuja</span>
            <span className='text-3xl font-semibold'>N35,000,000</span>
            <div>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">More Info</button>
                <button  className='hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >Play now</button>
            </div>
          </div>
          <div className="bg-white text-black flex flex-col w-full h-[200px]  justify-around rounded-xl max-w-[275px] shadow-sm shadow-white ">
            <span>4,Plots of Land. Abuja</span>
            <span className='text-3xl font-semibold'>N35,000,000</span>
            <div>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">More Info</button>
                <button  className='hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >Play now</button>
            </div>
          </div>
          <div className="bg-white text-black flex flex-col w-full h-[200px]  justify-around rounded-xl max-w-[275px] shadow-sm shadow-white ">
            <span>4,Plots of Land. Abuja</span>
            <span className='text-3xl font-semibold'>N35,000,000</span>
            <div>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">More Info</button>
                <button  className='hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >Play now</button>
            </div>
          </div>
          <div className="bg-white text-black flex flex-col w-full h-[200px]  justify-around rounded-xl max-w-[275px] shadow-sm shadow-white ">
            <span>4,Plots of Land. Abuja</span>
            <span className='text-3xl font-semibold'>N35,000,000</span>
            <div>
                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">More Info</button>
                <button  className='hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >Play now</button>
            </div>
          </div>

         </div> 
        </div>
    )
}

export default OngoingCardGames;