import HeaderDashboard from "../layout/HeaderDashboard";
import DefualtLayout from "../layout/DefaultLayout";
import { useAddProduct } from "../../../hooks/admin/useAddProduct";
import { Link } from 'react-router-dom';
import ButtonGenerateIdComponent from "../../../components/buttons/ButtonGenerateIdComponent";
import ButtonCancelComponent from "../../../components/buttons/ButtonCancelComponent";
import ButtonViewComponent from "../../../components/buttons/ButtonViewComponent";
import ModalGenerateIdComponent from "../../../components/modals/ModalGenerateIdComponent";
import AlertSuccessComponent from "../../../components/modals/AlertSuccessComponent";

export default function Product() {

    const { 
        handleChangeDollar,
        isPrice,
        handleChangePercent,
        isPercent,
        isCalculateDiscount,
        dropdownToggleType,
        isDropdownType,
        dropdownToggleBrand,
        isDropdownBrand,
        productTypes,
        searchType,
        setSearchType,
        handleSearchType,
        dataSearchType,
        brands,
        handleSearchBrand,
        searchBrand,
        setSearchBrand,
        dataSearchBrand,
        isTextGenerator,
        handleInputProduct,
        modalOpen,
        setModalOpen,
        handleGenerateId,
        provideProductId,
        handleSelectType,
        handleSelectBrand,
        images,
        handleFileChange,
        handleChangeInputProduct,
        isForm,
        valueSelectType,
        valueSelectBrand,
        isMessage,
        createSuccess,
        handleInputSubImage,
        subImages,
        handleRemoveSubImg,
        updateSuccess,
        handleClearProduct

    } = useAddProduct();

    
    return (
        <>
            <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
                <div className="flex items-start">
                    <DefualtLayout />
                    <section className="main-content w-full px-6">
                        <HeaderDashboard />
                       
                            <div className="my-6 px-2">
                                <div className="flex justify-between bg-white items-center p-3">
                                    <h1 className="text-[15px] font-semibold">
                                        Add New Product
                                    </h1>
                                    <Link to="/viewproduct">
                                        <ButtonViewComponent textButton="View Products" />
                                    </Link>
                                </div>
                                <div className="flex items-start gap-6 flex-wrap">
                                    <div className="px-4 py-4 space-y-6 font-[sans-serif] text-[#333] w-full rounded-md">
                                        <div className="flex gap-2">
                                            <div className="w-full">
                                                <div className="w-full bg-white rounded-md">
                                                    <h1 className="text-lg p-4 font-semibold border-b">Product Image</h1>
                                                        <div className="mb-2 mt-6">
                                                            <label className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                                                    <path
                                                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                                                    data-original="#000000" />
                                                                    <path
                                                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                                                    data-original="#000000" />
                                                                </svg>
                                                                Upload file
                                                                <input  onChange={handleFileChange} type="file" id='uploadFile1' className="hidden" />
                                                                <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                                                            </label>
                                                        </div>

                                                        {/* Display selected images */}
                                                        <div className="mt-4 grid grid-cols-4 gap-4 p-3">
                                                            { images.map((image, index) => (
                                                            <div key={index} className="flex justify-center relative">
                                                                <img src={ image.url } alt={ image.file ? image.file.name : "Image"} className="w-full h-auto border rounded-md" />
                                                            </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="w-full bg-white pb-5 rounded-md mt-2">
                                                    <h1 className="text-lg p-4 font-semibold border-b">Sub Images</h1>
                                                        <div className="mb-2 mt-6">
                                                            <label className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                                                    <path
                                                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                                                    data-original="#000000" />
                                                                    <path
                                                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                                                    data-original="#000000" />
                                                                </svg>
                                                                Upload file
                                                                <input onChange={handleInputSubImage} type="file" id='uploadFile1' className="hidden" />
                                                                <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                                                            </label>
                                                        </div>

                                                        {/* Display selected images */}
                                                        <div className="mt-4 grid grid-cols-4 gap-4 p-3">
                                                            {subImages.map((image, index) => (
                                                            <div key={index} className="flex justify-center relative">
                                                                <img src={ image.url } alt={ image.file ? image.file.name : "Image" } className="w-full h-auto border rounded-md" />
                                                                    <span onClick={() => handleRemoveSubImg(index)} className="absolute cursor-pointer top-0 right-0 text-xs font-medium text-white p-1 rounded-sm bg-red-700 mx-2 my-2">
                                                                        Remove
                                                                    </span>
                                                            </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                            </div>

                                            <div className="w-full">

                                                <div className="w-full bg-white rounded-md">
                                                    <h1 className="text-lg p-4 font-semibold border-b">General Information</h1>
                                                    <div className="p-4">
                                                    <div className="mb-4">
                                                        <label className="mb-2 text-sm block">No.</label>
                                                        <input 
                                                            value={
                                                                provideProductId ?
                                                                provideProductId :
                                                                isForm.product.product_id || ''
                                                            }
                                                            disabled
                                                            type='text' 
                                                            placeholder='Generate product id'
                                                            className="px-4 py-2 text-sm rounded-md font-semibold bg-gray-200 border border-gray-200 w-full outline-blue-500" 
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="mb-2 text-sm block">Product Name</label>
                                                        <input 
                                                            name="product_name"
                                                            value={isForm.product.product_name || ''}
                                                            onChange={handleChangeInputProduct}
                                                            type='text' 
                                                            placeholder='Enter product name'
                                                            className="px-4 py-2 text-sm rounded-md bg-white border border-gray-200 w-full outline-blue-500" 
                                                        />
                                                    </div>

                                                    <div className="mt-2 flex gap-2">
                                                        <div className="relative font-[sans-serif] w-full">
                                                        <label className="mb-2 text-sm block">Product Type</label>
                                                            <button type="button" id="dropdownToggle"
                                                                onClick={dropdownToggleType}
                                                                className="px-5 rounded-md py-2.5 border flex justify-between items-center border-gray-200 w-full text-gray-800 text-sm outline-none bg-white hover:bg-gray-50">
                                                                { 
                                                                    valueSelectType ? 
                                                                    valueSelectType :
                                                                    (isForm.productType.type || 'Select Type')
                                                                }
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 inline ml-3" viewBox="0 0 24 24">
                                                                <path fillRule="evenodd"
                                                                    d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                                                    clipRule="evenodd" data-original="#000000" />
                                                                </svg>
                                                            </button>

                                                            { isDropdownType && (
                                                                <ul id="dropdownMenu" className='absolute  shadow-[0_8px_19px_-7px_rgba(6,81,237,0.2)] bg-white py-2 z-[1000] min-w-full w-max divide-y max-h-96 overflow-auto'>
                                                                    <li className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>
                                                                    <input
                                                                        value={searchType}
                                                                        onChange={(e) => setSearchType(e.target.value)} 
                                                                        onKeyDown={handleSearchType} 
                                                                        type="text" 
                                                                        placeholder="Search Type..." 
                                                                        className="w-full outline-none bg-transparent text-gray-600 text-sm" />
                                                                    </li>
                                                                    { 
                                                                        (Array.isArray(dataSearchType) && dataSearchType.length > 0 ? dataSearchType :  productTypes).map((itemTypes, index) => {
                                                                            return (
                                                                                <li 
                                                                                    onClick={() => handleSelectType(itemTypes)}
                                                                                    key={index}  
                                                                                    className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>
                                                                                    {itemTypes.type}
                                                                                </li>
                                                                            )
                                                                        }) 
                                                                    }
                                                                </ul>
                                                            )}
                                                        </div>

                                                        <div className="relative font-[sans-serif] w-full">
                                                        <label className="mb-2 text-sm block">Product Brand</label>
                                                            <button type="button" id="dropdownToggle"
                                                                onClick={dropdownToggleBrand}
                                                                className="px-5 rounded-md  py-2.5 border flex justify-between items-center border-gray-200 w-full text-gray-800 text-sm outline-none bg-white hover:bg-gray-50">
                                                                { 
                                                                    valueSelectBrand 
                                                                    ? valueSelectBrand
                                                                    : (isForm.brand.brand || 'Select Brand')
                                                                }
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 inline ml-3" viewBox="0 0 24 24">
                                                                <path fillRule="evenodd"
                                                                    d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                                                    clipRule="evenodd" data-original="#000000" />
                                                                </svg>
                                                            </button>

                                                            { isDropdownBrand && (
                                                                <ul id="dropdownMenu" className='absolute shadow-[0_8px_19px_-7px_rgba(6,81,237,0.2)] bg-white py-2 z-[1000] min-w-full w-max divide-y max-h-96 overflow-auto'>
                                                                    <li className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>
                                                                    <input
                                                                        onKeyDown={handleSearchBrand}
                                                                        value={searchBrand}
                                                                        onChange={(e) => setSearchBrand(e.target.value)}
                                                                        type="text" 
                                                                        placeholder="Search Brand..." 
                                                                        className="w-full outline-none bg-transparent text-gray-600 text-sm" 
                                                                    />
                                                                    </li>
                                                                    {(Array.isArray(dataSearchBrand) && dataSearchBrand.length > 0 ? dataSearchBrand : brands).map((itemBrand, index) => {
                                                                        return (
                                                                            <li 
                                                                                onClick={() => handleSelectBrand(itemBrand)}
                                                                                key={index} 
                                                                                className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>
                                                                                {itemBrand.brand}
                                                                            </li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="mt-4 w-full">
                                                            <label className="mb-2 text-sm block">Price</label>
                                                            <input 
                                                                value={isPrice}
                                                                onChange={handleChangeDollar}
                                                                type='text' 
                                                                placeholder='Enter price'
                                                                className="px-4 py-2 text-sm rounded-md bg-white border border-gray-200 w-full outline-blue-500" 
                                                            />
                                                        </div>
                                                        <div className="mt-4 w-full">
                                                            <label className="mb-2 text-sm block">Discount</label>
                                                            <input 
                                                                value={isPercent}
                                                                onChange={handleChangePercent}
                                                                type='text' 
                                                                placeholder='Enter discount'
                                                                className="px-4 py-2 text-sm rounded-md bg-white border border-gray-200 w-full outline-blue-500" 
                                                            />
                                                        </div>
                                                        <div className="mt-4 w-full">
                                                            <label className="mb-2 text-sm block">Price Discount</label>
                                                            <input 
                                                                disabled
                                                                value={isCalculateDiscount}
                                                                readOnly
                                                                type='text' 
                                                                placeholder='Price discount'
                                                                className="px-4 py-2 text-sm rounded-md bg-white border border-gray-200 w-full outline-blue-500" 
                                                            />
                                                        </div>
                                                    </div>  

                                                    <div className="mt-4">
                                                        <div className=" w-full font-[sans-serif]">
                                                            <label className="text-black text-sm block mb-2">Descriptions</label>
                                                                <div className="w-full">
                                                                <textarea 
                                                                    name="description"
                                                                    onChange={handleChangeInputProduct}
                                                                    value={isForm.product.description || ''}
                                                                    placeholder='Type Description'
                                                                    className="p-4 bg-white w-full text-sm border rounded border-gray-200 outline-[#007bff]">
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <label className="text-black text-sm block mb-2">Expiration Date</label>
                                                        <input 
                                                            name="expiration"
                                                            onChange={handleChangeInputProduct}
                                                            value={isForm.product.expiration || ''}
                                                            className="px-4 py-2 w-60 text-sm rounded-md bg-white border border-gray-200 outline-blue-500" 
                                                            type="date" 
                                                        />
                                                    </div>
                                                    </div>

                                                    <div className="mb-2 mt-8 flex gap-2 justify-end p-4">
                                                        <ButtonGenerateIdComponent onClick={handleInputProduct} isTextGenerator={isTextGenerator} />
                                                        <ButtonCancelComponent onClick={handleClearProduct} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </section>
                </div>
            </div>

            {/* Modal Generate Id */}
            { modalOpen && (
                <ModalGenerateIdComponent
                    titleModal="Do you want to generate Product Id ?"
                    setModalOpen={setModalOpen} 
                    handleGenerateId={handleGenerateId}
                />
            )}
            {/* Message  */}
            { isMessage && (
                <AlertSuccessComponent
                    message={
                        createSuccess 
                        ? createSuccess 
                        : updateSuccess
                    }
                />
            )}
        </>
    )
}