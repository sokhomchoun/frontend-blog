import HeaderDashboard from "../layout/HeaderDashboard";
import DefualtLayout from "../layout/DefaultLayout";
import { useViewProduct } from '../../../hooks/admin/useViewProduct';
import { Link } from 'react-router-dom';
import ButtonAddComponent from "../../../components/buttons/ButtonAddComponent";

export default function ViewProduct() {

    const { 
        products,
        toggleMenu,
        openMenuId,
        menuRef,
        handleAddStock,
        handleEditProduct,
        totalPages,
        currentPage,
        generatePagination,
        handlePageChange

    } = useViewProduct();
    

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
                                    <div className="flex px-4 py-2 rounded-md mb-2 border-2 border-gray-300 overflow-hidden max-w-xs font-[sans-serif]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                                            className="fill-gray-600 mr-3 rotate-90">
                                        <path
                                            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                        </path>
                                        </svg>
                                        <input
                                            type="text" 
                                            placeholder="Search products..." 
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
                                        <Link to='/product'>
                                            <ButtonAddComponent textButton="Add Product"/>
                                        </Link>
                                    </div>
                                </div>
                            
                            <div className="font-sans overflow-x-auto p-2">
                                    <table className="min-w-full bg-white">
                                        <thead className="bg_default whitespace-nowrap">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                No.
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Images
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Name
                                            </th>
                                      
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Price ($)
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Discount (%)
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Expiration
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Description
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 w-[200px] text-left text-sm font-semibold text-white border">
                                                Action
                                            </th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody className="whitespace-nowrap">
                                            {
                                                products.map((items, index) => {
                                                    return(
                                                        <tr key={index} className="hover:bg-blue-50 even:bg-gray-100">
                                                        <td className="px-4 text-[15px] text-gray-800 font-semibold border">{items.product_id}</td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">
                                                            <img src={`${import.meta.env.VITE_IMAGE_URL}${items.product_img}`} className="w-8 h-8 object-cover" alt="" />
                                                        </td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.product_name}</td>
                                                       
                                                        <td className="px-4 text-[15px] text-gray-800 border">
                                                            <span className="text-red-500 font-semibold">$ {items.price}</span>
                                                        </td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.discount}</td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.expiration}</td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.description}</td>
                                                        <td className="px-4 text-[15px] text-green-800 font-semibold border">
                                                        <span
                                                            className={`rounded-md px-3 pb-1 ${
                                                                items.status === "available"
                                                                    ? "bg-green-200 text-green-800"
                                                                    : "bg-red-200 text-red-800"
                                                                }`}
                                                            >
                                                            {items.status}
                                                        </span>
                                                        </td>
                                                        <td className="px-4 border relative">
                                                            <button
                                                                onClick={() => toggleMenu(items)}
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
                                                            {openMenuId === items.product_id && (
                                                                <div
                                                                    ref={menuRef}
                                                                    className="text_menu z-10 absolute top-0 left-14 bg-white shadow-lg rounded border"
                                                                >
                                                                    <p 
                                                                    onClick={() => handleEditProduct(items)} 
                                                                    className="px-4 py-2 text-[15px] hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-gray-500"
                                                                            viewBox="0 0 348.882 348.882">
                                                                            <path
                                                                                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                                                                data-original="#000000" />
                                                                            <path
                                                                                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                                                                data-original="#000000" />
                                                                        </svg>
                                                                        Edit
                                                                    </p>
                                                                    <p 
                                                                    // onClick={() => handleDeleteBrand(items)} 
                                                                    className="px-4 py-2 text-[15px] hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-gray-500" viewBox="0 0 24 24">
                                                                        <path
                                                                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                                            data-original="#000000" />
                                                                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                                            data-original="#000000" />
                                                                        </svg>
                                                                        Delete
                                                                    </p>
                                                                    <p 
                                                                    onClick={() => handleAddStock(items)} 
                                                                        className="px-4 py-2 text-[15px] hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                        </svg>
                                                                        Add Stock
                                                                    </p>
                                                                </div>
                                                            )}
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

                                        { generatePagination(totalPages, currentPage).map((page, index) =>
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