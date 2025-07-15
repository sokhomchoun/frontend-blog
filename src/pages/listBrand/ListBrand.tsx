import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useBrand } from "../../hooks/useBrand";
import { ImageUrl } from "../../utils/ImageUrl";
import LoadingComponent from "../../components/loading/LoadingComponent";
export default function ListBrand() {
    const { 
        itemLists,
        isLoading,
        handleDetailProduct
        
    } = useBrand();
    return (
        <>
            { isLoading ? ( <LoadingComponent /> ) : null }
            <Header />
                <div className="font-sans bg-gray-50 px-4 py-8">
                    <div className="mx-auto container">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            { itemLists.map((items, index) => {
                                return (
                                    <div key={index} onClick={() => handleDetailProduct(items)} className="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
                                        <div className="w-full h-[130px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                                            <img src={`${ImageUrl}${items.product_img}`} className="h-full w-5/6 mx-auto block object-contain" alt="" />
                                        </div>
                                        <div className="text-center mt-4">
                                            <h3 className="text-sm font-bold text-gray-800">{items.product_name}</h3>
                                            <h4 className="text-base text-red-500 font-bold mt-2">
                                                $ { items.discount 
                                                    ? (parseFloat(items.price) - (parseFloat(items.price) * (parseFloat(items.discount)) / 100)).toFixed(2)
                                                    : (parseFloat(items.price)).toFixed(2)
                                                }
                                            </h4>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}