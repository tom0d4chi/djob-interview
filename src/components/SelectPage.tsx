import { SelectPageProps } from '../types'

export default function SelectPage({totalPages = 99, currentPage = 18, setCurrentPage}: SelectPageProps){
    
    const displayedPageNumbers = () => {
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
    
        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + 4);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - 4);
            }
        }
    
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <div className='text-white w-full flex justify-center mt-10'> 
            {displayedPageNumbers().map(number => 
                <button 
                    onClick={() => setCurrentPage(number)}
                    className={`mx-4 rounded-full h-10 w-10 ${number !== currentPage ? 'hover:bg-[#636363] transition-all' : ''}`}
                    style={{background: number === currentPage ? 'linear-gradient(30deg, #5123CF, #F52C9A)': ''}}
                    key={number}>
                    {number}
                </button>)}
        </div>
    )
}