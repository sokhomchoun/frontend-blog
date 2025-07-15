import HeaderDashboard from "../layout/HeaderDashboard";
import DefualtLayout from "../layout/DefaultLayout";
import { useStock } from "../../../hooks/admin/useStock";
export default function Stock() {
    const { 
        stocks,
        currentPage,
        handlePageChange,
        totalPages,
        generatePagination
        
    } = useStock();
    
    return (
        <>
            <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
                <div className="flex items-start">
                    <DefualtLayout />
                    <section className="main-content w-full px-6">
                        <HeaderDashboard />

                        <div className="px-4 mt-3">
                            <div className="bg-white pt-2">
                                <div className="flex justify-between px-4">
                                    <div className="flex px-4 py-2 rounded-md mb-2 ml-2 border-2 border-gray-300 overflow-hidden max-w-xs font-[sans-serif]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                                            className="fill-gray-600 mr-3 rotate-90">
                                        <path
                                            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                        </path>
                                        </svg>
                                        <input
                                            type="text" 
                                            placeholder="Search product stock..." 
                                            className="w-full outline-none bg-transparent text-gray-600 text-sm" 
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        <button 
                                            type='button' 
                                            className='bg-white font-semibold text-gray-700 border px-4 py-2 rounded text-[13px] h-[35px] flex items-center gap-2 border-gray-200 hover:bg-gray-50 active:bg-gray-50'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h7a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
                                            </svg>
                                            Sort
                                        </button>

                                        <button 
                                            type='button' 
                                            className='bg-white font-semibold text-gray-700 border px-4 py-2 rounded text-[13px] h-[35px] flex items-center gap-2 border-gray-200 hover:bg-gray-50 active:bg-gray-50'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h12" />
                                            </svg>
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            

                            <div className="font-sans overflow-x-auto p-2">
                                    <table className="min-w-full bg-white">
                                        <thead className="bg_default whitespace-nowrap">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Product No.
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Color
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Size
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Price ($)
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Stock
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Action
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="whitespace-nowrap">
                                            {
                                                stocks.map((items, index) => {
                                                    return(
                                                        <tr key={index} className="hover:bg-blue-50 even:bg-gray-100">
                                                        <td className="px-4 text-[15px] text-gray-800 font-semibold border">{items.product_id}</td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.color}</td>
                                                    
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.size}</td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">
                                                            <div className="span text-red-500 font-semibold">
                                                                {items.price}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.quantity}</td>
                                                        <td className="px-4 text-[15px] text-green-800 font-semibold border"><span className='bg-green-200 rounded-md px-3 pb-1'>{items.status}</span></td>
                                                        <td className="px-4 border relative">
                                                            <button
                                                                
                                                                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                                title="More options"
                                                            >
                                                                <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                                >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                                                />
                                                                </svg>
                                                            </button>
                                                                <div
                                                                    className="text_menu absolute top-0 left-14 bg-white shadow-lg rounded border"
                                                                >

                                                                </div>
                                                        </td>
                                                    </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    {/* Paginations  */}
                                    <ul className="flex space-x-4 justify-center mt-8 font-[sans-serif]">
                                        
                                        <li
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={`flex items-center justify-center shrink-0 w-9 h-9 rounded-md cursor-pointer ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3" viewBox="0 0 55.753 55.753">
                                                <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"/>
                                            </svg>
                                        </li>

                                        {generatePagination(totalPages, currentPage).map((page, index) =>
                                            page === '...' ? (
                                                <li key={`ellipsis-${index}`} className="flex items-center justify-center shrink-0 text-base font-bold px-[13px] h-9 rounded-md text-gray-800">
                                                    ...
                                                </li>
                                            ) : (
                                                <li
                                                    key={page}  // Page numbers are guaranteed to be unique, so they can use the page value as the key
                                                    onClick={() => {
                                                        if (typeof page === 'number') {
                                                            handlePageChange(page);
                                                        }
                                                    }}
                                                    className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold px-[13px] h-9 rounded-md ${currentPage === page ? 'bg_default text-white' : 'text-gray-800 hover:bg-gray-200'}`}
                                                >
                                                    {page}
                                                </li>
                                            )
                                        )}

                                        
                                        <li
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={`flex items-center justify-center shrink-0 w-9 h-9 rounded-md cursor-pointer ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 rotate-180" viewBox="0 0 55.753 55.753">
                                                <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"/>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>


                    </section>
                </div>
            </div>
        </>
    )
}