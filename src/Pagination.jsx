function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex mx-auto justify-center mt-4 w-[90%]">
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-3 py-1 bg-gray-400 rounded mr-2"
                >
                    Previous
                </button>
            )}
            <div className="overflow-x-auto  max-w-fit-content">
                <div className="flex space-x-2 w-max">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-3 py-1 bg-gray-400 rounded mb-2 ml-2"
                >
                    Next
                </button>
            )}
        </div>
    );
}

export default Pagination;



// function Pagination({ currentPage, totalPages, onPageChange }) {
//     const visiblePages = 5; 
//     let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + visiblePages - 1);
  
//     if (endPage - startPage + 1 < visiblePages) {
//       startPage = Math.max(1, endPage - visiblePages + 1);
//     }
  
//     const pages = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }
  
//     return (
//       <div className="flex justify-center mt-4 space-x-2 overflow-x-auto max-w-full">
//         {currentPage > 1 && (
//           <button
//             onClick={() => onPageChange(currentPage - 1)}
//             className="px-3 py-1 bg-gray-300 rounded"
//           >
//             Previous
//           </button>
//         )}
//         {pages.map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`px-3 py-1 rounded ${
//               page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//         {currentPage < totalPages && (
//           <button
//             onClick={() => onPageChange(currentPage + 1)}
//             className="px-3 py-1 bg-gray-300 rounded"
//           >
//             Next
//           </button>
//         )}
//       </div>
//     );
//   }
  
//   export default Pagination;