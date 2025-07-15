import { useBrand } from "../../../hooks/useBrand";
import { ImageUrl } from "../../../utils/ImageUrl";
import LoadingComponent from "../../../components/loading/LoadingComponent";
export default function Brand() {
    
    const { 
        itemBrands,
        handleListBrand,
        isLoading
    } = useBrand();

    return (
        <>
            { isLoading ? ( <LoadingComponent /> ) : null }
            <div className="font-sans bg-white py-4 mx-auto container">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Brands</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    { itemBrands.map((items, index) => (
                        <div key={index} onClick={() => handleListBrand(items)} className="bg-gray-100 p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
                            <div className="w-[100px] overflow-hidden mx-auto">
                                <img src={`${ImageUrl}${items.brand_img}`} alt="product1" className="aspect-[108/82] w-full object-contain" />
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-sm font-bold text-gray-800">{items.brand}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
        
    )
}