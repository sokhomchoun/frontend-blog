
import DefaultLayout from '../layout/DefaultLayout';
import HeaderDashboard from '../layout/HeaderDashboard';
import { Link } from 'react-router-dom';
import { useStock } from '../../../hooks/admin/useStock';
import AlertSuccessComponent from '../../../components/modals/AlertSuccessComponent';
export default function AddStock() {

    const {
        product_id,
        handleChangeInputStock,
        Form,
        handleAddStock,
        arrayListStock,
        totalStocks,
        toggleMenu,
        openMenuId,
        menuRef,
        handleEditStock,
        isTextGenerator,
        handleDeleteStock,
        handleCancel,
        handleSubmitStock,
        isMessage,
        createSuccess

    } = useStock();
    
    return (
        <>
            <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
                <div className="flex items-start">
                    <DefaultLayout />
                    <section className="main-content w-full px-6">
                        <HeaderDashboard />
                    
                            <div className="my-6 px-2">
                            <div className="flex justify-between bg-white items-center p-3">
                                    <h1 className="text-[15px] font-semibold">
                                        Add Stocks
                                    </h1>
                                    <Link to="/stock">
                                        <button className="bg-white px-3 py-2 text-gray-700 rounded-md flex gap-2 items-center border hover:bg-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] cursor-pointer" viewBox="0 0 128 128">
                                                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                            </svg>
                                            <span>
                                                View Stock
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                                <div className="flex items-start gap-6 flex-wrap">
                                    <div className="px-4 py-4 space-y-6 font-[sans-serif] text-[#333] w-full rounded-md">
                                        <div className="flex gap-2">
                                            <div className="w-full">
                                                <div className="w-full bg-white rounded-md mt-2 mb-2">
                                                        <h1 className="text-lg p-4 font-semibold border-b">Manage Stock</h1>
                                                        <div className="p-4">
                                                            <div className="mt-4 w-2/6">
                                                                <label className="mb-2 text-sm block">Product No.</label>
                                                                <input 
                                                                    value={product_id}
                                                                    type='text' 
                                                                    disabled
                                                                    placeholder='Product No.'
                                                                    className="px-4 py-2 text-sm font-semibold bg-gray-200 rounded-md border border-gray-200 w-full outline-blue-500" 
                                                                />
                                                            </div>
                                                            <div className="flex gap-4">
                                                                <div className="mt-4 w-3/6">
                                                                    <label className="mb-2 text-sm block">Color</label>
                                                                    <input 
                                                                        name="color"
                                                                        onChange={handleChangeInputStock}
                                                                        value={Form?.color || ''}
                                                                        type='text' 
                                                                        placeholder='Enter stock color'
                                                                        className="px-4 py-2 text-sm rounded-md bg-white border border-gray-200 w-full outline-blue-500" 
                                                                    />
                                                                </div>
                                                                <div className="mt-4 w-3/6">
                                                                    <label className="mb-2 text-sm block">Size</label>
                                                                    <input 
                                                                        name="size"
                                                                        onChange={handleChangeInputStock}
                                                                        value={Form?.size || ''}
                                                                        type='text' 
                                                                        placeholder='Enter stock size'
                                                                        className="px-4 py-2 text-sm rounded-md bg-white border border-gray-200 w-full outline-blue-500" 
                                                                    />
                                                                </div>
                                                                <div className="mt-4 w-3/6">
                                                                    <label className="mb-2 text-sm block">Price</label>
                                                                    <input 
                                                                        name="price"
                                                                        onChange={handleChangeInputStock}
                                                                        value={Form?.price || ''}
                                                                        type='text' 
                                                                        placeholder='Enter price'
                                                                        className="px-4 py-2 text-sm rounded-md bg-white border border-gray-200 w-full outline-blue-500" 
                                                                    />
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                            <div className="flex gap-2">

                                                            <div className="mt-4 w-full">
                                                                    <label className="mb-2 text-sm block">Quantity</label>
                                                                    <input 
                                                                        name="quantity"
                                                                        onChange={handleChangeInputStock}
                                                                        value={Form?.quantity || ''}
                                                                        type='text' 
                                                                        placeholder='Enter stock quantity'
                                                                        className="px-4 py-2 text-sm rounded-md bg-white border border-gray-200 w-full outline-blue-500" 
                                                                    />
                                                                </div>

                                                                <div className="mt-4 w-full">
                                                                    <label className="mb-2 text-sm block">Stock</label>
                                                                    <input 
                                                                        value={totalStocks || 0}
                                                                        disabled
                                                                        name="stock"
                                                                        type='text' 
                                                                        placeholder='0'
                                                                        className="px-4 py-2 text-sm font-semibold rounded-md bg-gray-200 border border-gray-200 w-full outline-blue-500" 
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="modal-footer p-3 flex justify-center mt-4 gap-3">
                                                                <button
                                                                    onClick={handleSubmitStock}
                                                                    className="bg-green-800 flex gap-2 items-center text-white px-5 py-1 hover:bg-green-900 rounded">
                                                                    <svg className="h-5 w-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                        <path d="M17 3H7C5.9 3 5 3.9 5 5v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 5h10v4H7V5zm10 14H7v-6h10v6zm-8-4h2v2H9v-2zm4 0h2v2h-2v-2z"/>
                                                                    </svg>
                                                                    Submit
                                                                </button>
                                                                <button 
                                                                    onClick={handleAddStock}
                                                                    className="bg_default flex gap-2 items-center text-white px-5 py-1 hover:bg-blue-900 rounded">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                    </svg>
                                                                    { isTextGenerator }
                                                                </button>
                                                                <button 
                                                                    onClick={handleCancel}
                                                                    className="bg-red-500 flex gap-2 items-center text-white px-5 py-1 hover:bg-red-600 rounded">
                                                                    <svg className="h-5 w-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    Cancel
                                                                </button>
                                                            </div>  

                                                        </div>
                                                    </div>
                                            </div>

                                        </div>
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
                                                Quantity
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-white border">
                                                Action
                                            </th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody className="whitespace-nowrap">
                                            { arrayListStock.map((items, index) => {
                                                    return(
                                                        <tr key={index} className="hover:bg-blue-50 even:bg-gray-100">
                                                        <td className="px-4 text-[15px] text-gray-800 font-semibold border">{product_id}</td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.color}</td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.size}</td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">
                                                            <span className="text-red-500 font-semibold">{items.price}</span>
                                                        </td>
                                                        <td className="px-4 text-[15px] text-gray-800 border">{items.quantity}</td>
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
                                                            { openMenuId === items.id && (
                                                                <div
                                                                    ref={menuRef}
                                                                    className="text_menu z-10 absolute top-0 left-14 bg-white shadow-lg rounded border"
                                                                >
                                                                    <p 
                                                                    onClick={() => handleEditStock(items)} 
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
                                                                    onClick={() => handleDeleteStock(items)} 
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
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </section>
                </div>
            </div>

            { isMessage && ( <AlertSuccessComponent message={createSuccess} /> )}

        </>
    )
}