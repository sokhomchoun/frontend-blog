import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useProductView } from "../../hooks/useProductView";
import { img_url } from "../../services/url/url.service";
import LoadingComponent from "../../components/loading/LoadingComponent";

export default function ProductView() {

    const { 
        itemProductViews,
        selectedImage,
        setSeletedImage,
        isLoading,
        handleAddCart,
        selectedColor,
        setSelectedColor,
        selectedSize,
        setSelectedSize,
        itemTypeProducts,
        quantity,
        decrementQuantity,
        incrementQuantity,
        countCart

    } = useProductView();

    return (
        <>
            { isLoading ? ( <LoadingComponent /> ) : null }

            <Header countValues={countCart}  />
                <div className="font-sans mt-3 mb-5">
                    <div className="p-4 max-w-7xl max-md:max-w-xl mx-auto bg-gray-100">
                        <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="w-full lg:sticky top-0 flex gap-3">
                                { itemProductViews.map((product) => (
                                    <div key={product.product_id} className="w-full flex gap-3">
                                        <div className="w-3/4 rounded-lg object-cover relative">  
                                            <img src={selectedImage || `${img_url}${product.product_img}`} alt={product.product_name} />
                                            { product.discount && (
                                                <div className="absolute top-0 bg-red-500 font-semibold text-white py-1 px-2"><h4>{product.discount} %</h4></div>
                                            )}
                                           
                                        </div>
                                
                                        <div className="w-20 flex flex-col max-sm:mb-4 gap-3">
                                        { product.SubProduct.map((subProduct, index) => (
                                            <div key={index}>
                                                { subProduct.subproduct_img1 && (
                                                    <img
                                                        src={`${img_url}${subProduct.subproduct_img1}`}
                                                        alt="SubProduct1"
                                                        className={`w-full cursor-pointer rounded border p-2 
                                                            ${ selectedImage === `${img_url}${subProduct.subproduct_img1}` ? 'border-blue-500' : 'border-gray-100'
                                                        }`}
                                                        onClick={() => setSeletedImage(`${img_url}${subProduct.subproduct_img1}`)}
                                                    />
                                                )}
                                                { subProduct.subproduct_img2 && (
                                                    <img
                                                        src={`${img_url}${subProduct.subproduct_img2}`}
                                                        alt="SubProduct2"
                                                        className={`w-full cursor-pointer rounded border p-2 ${
                                                            selectedImage === `${img_url}${subProduct.subproduct_img2}` ? 'border-blue-500' : 'border-gray-100'
                                                        }`}
                                                        onClick={() => setSeletedImage(`${img_url}${subProduct.subproduct_img2}`)}
                                                    />
                                                )}
                                                { subProduct.subproduct_img3 && (
                                                    <img
                                                        src={`${img_url}${subProduct.subproduct_img3}`}
                                                        alt="SubProduct3"
                                                        className={`w-full cursor-pointer rounded border p-2 ${
                                                            selectedImage === `${img_url}${subProduct.subproduct_img3}` ? 'border-blue-500' : 'border-gray-100'
                                                        }`}
                                                        onClick={() => setSeletedImage(`${img_url}${subProduct.subproduct_img3}`)}
                                                    />
                                                )}
                                                { subProduct.subproduct_img4 && (
                                                    <img
                                                        src={`${img_url}${subProduct.subproduct_img4}`}
                                                        alt="SubProduct4"
                                                        className={`w-full cursor-pointer rounded border p-2 ${
                                                            selectedImage === `${img_url}${subProduct.subproduct_img4}` ? 'border-blue-500' : 'border-gray-100'
                                                        }`}
                                                        onClick={() => setSeletedImage(`${img_url}${subProduct.subproduct_img4}`)}
                                                    />
                                                )}
                                            </div>
                                        ))}

                                        </div>
                                    </div>
                                ))}
                            </div>

                            { itemProductViews.map((products, index) => (
                                <div key={index}>
                                    <h2 className="text-xl max-sm:text-2xl font-semibold text-gray-800 border-b-2 pb-4">{products.product_name}</h2>
                                    <div className="mt-4 flex gap-5 items-center ">
                                        <h3 className="text-red-500 text-2xl max-sm:text-3xl font-bold">
                                            $ { products.discount 
                                                ? (parseFloat(products.price) - (parseFloat(products.price) * parseFloat(products.discount) / 100)).toFixed(2) 
                                                : (parseFloat(products.price))
                                            }
                                        </h3>
                                        { products.discount && (
                                            <h3 className="text-gray-800 text-xl max-sm:text-3xl font-bold line-through">
                                                $ { (parseFloat(products.price)).toFixed(2) }
                                            </h3>
                                        )}
                                    </div>

                                    { products.stockKeeping.some(stockKeeping => stockKeeping.size) && (
                                        <div className="mt-8">
                                            <h3 className="text-sm text-gray-400">Size: </h3>
                                            <div className="flex gap-2">
                                                { products.stockKeeping.map((stockKeeping, index) => (
                                                    stockKeeping.size && (
                                                        <div key={index} className="flex flex-wrap gap-4 mt-4">
                                                            <button
                                                                onClick={() => setSelectedSize(stockKeeping.size)}
                                                                type="button"
                                                                className={`w-9 h-9 border-2 rounded bg-gray-200 ${
                                                                    selectedSize === stockKeeping.size? 'border-gray-800' : 'border-white'}
                                                                }`}
                                                            >
                                                                {stockKeeping.size}
                                                            </button>
                                                        </div>
                                                    )
                                                ))}
                                            </div>

                                        </div>
                                    )}
                                    
                                    { products.stockKeeping.some(stockKeeping => stockKeeping.color) && (
                                        <div className="mt-8">
                                            <h3 className="text-sm text-gray-400">Color: <span className="text-sm font-semibold text-black">{selectedColor}</span></h3>
                                            <div className="flex gap-2">
                                                { products.stockKeeping.map((stockKeeping, index) => (
                                                    <div key={index} className="flex flex-wrap gap-4 mt-2">
                                                        <button
                                                            onClick={() => setSelectedColor(stockKeeping.color)}
                                                            type="button"
                                                            className={`w-9 h-9 border-2 ${ 
                                                                selectedColor === stockKeeping.color ? 'border-gray-800' : 'border-white'} 
                                                                hover:border-gray-800 rounded shrink-0`
                                                            }
                                                            style={{ backgroundColor: stockKeeping.color }}
                                                        ></button>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <h3 className="text-sm text-gray-400 mb-2">Quantity:</h3>
                                        <div className="flex border border-gray-300 w-28">
                                            <div onClick={decrementQuantity} className="flex-1 px-1 py-1 border-r border-gray-300 bg-gray-200 text-center text-sm cursor-pointer">−</div>
                                            <div className="flex-1 px-1 py-1 border-r border-gray-300 text-center text-sm">{ quantity }</div>
                                            <div onClick={incrementQuantity} className="flex-1 px-1 py-1 text-center text-sm bg-gray-200 cursor-pointer">+</div>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex flex-wrap gap-4">
                                        <button onClick={() => handleAddCart(products)} type="button" className="flex items-center h-[40px] justify-center px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white border border-blue-800 text-base rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer fill-current inline mr-3" viewBox="0 0 512 512">
                                                <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0" data-original="#000000"></path>
                                            </svg>
                                            Add to cart
                                        </button>

                                        <button type="button" className="flex items-center justify-center h-[40px] px-8 py-4 bg-transparent hover:bg-gray-50 text-gray-800 border border-gray-800 text-base rounded-lg">
                                            Buy Now
                                        </button>
                                    </div>

                                    <ul className="space-y-3 list-disc pl-4 pb-4 text-sm text-gray-600 mt-8">
                                        <li>A gray t-shirt is a wardrobe essential because it is so versatile.</li>
                                        <li>Available in a wide range of sizes, from extra small to extra large, and even in tall and petite sizes.</li>
                                        <li>This is easy to care for. They can usually be machine-washed and dried on low heat.</li>
                                        <li>You can add your own designs, paintings, or embroidery to make it your own.</li>
                                    </ul>

                                </div>

                            ))}

                        </div>
                    </div>

                    <div className="p-4 max-w-7xl max-md:max-w-xl mt-2 mx-auto bg-gray-100">
                        <div className="font-sans p-4">
                            <ul className="flex">
                                <li id="homeTab"
                                    className="tab text-blue-600 font-semibold text-[15px] py-2.5 px-5 border-b-2 border-blue-600 cursor-pointer">
                                    OVERVIEW
                                </li>
                                <li id="settingTab"
                                    className="tab text-gray-600 font-semibold text-[15px] py-2.5 px-5 border-b-2 border-transparent cursor-pointer">
                                    CUSTMER REVIEWS(0)
                                </li>
                            </ul>

                            <div id="homeContent" className="tab-content block mt-8">
                                
                            <div className="font-sans  px-4 py-8">
                                <div className="mx-auto lg:max-w-6xl md:max-w-4xl">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        { itemTypeProducts.map((types, index) => (
                                            <div key={index} className="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
                                                <div className="w-full overflow-hidden mx-auto">
                                                    <img src={`${img_url}${types.product_img}`} className="h-full w-5/6 mx-auto block object-contain" alt="" />
                                                </div>
                                                <div className="text-center mt-4">
                                                    <h3 className="text-sm font-bold text-gray-800">{ types.product_name }</h3>
                                                    <h4 className="text-base text-red-500 font-bold mt-2">
                                                        $ { types.discount 
                                                            ? (parseFloat(types.price) - (parseFloat(types.price) * (parseFloat(types.discount)) / 100)).toFixed(2)
                                                            : (parseFloat(types.price)).toFixed(2)
                                                        }
                                                    </h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            </div>
                            <div id="settingContent" className="tab-content max-w-2xl hidden mt-8">
                                <h4 className="text-lg font-bold text-gray-600">Setting</h4>
                                <p className="text-sm text-gray-600 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed auctor auctor arcu, at fermentum dui.
                                    Maecenas vestibulum a turpis in lacinia.
                                    Proin aliquam turpis at erat venenatis malesuada.
                                    Sed semper, justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 max-w-7xl max-md:max-w-xl mt-2 mx-auto">
                        <h1 className="text-xl font-semibold">Key Attributes</h1>
                        <h1>Industry-specific attributes</h1>
                        <div className="mt-5">
                            <div className="flex gap-2 border w-[50%] justify-between items-center">
                                <h1 className="w-full border-r-2 p-2.5 bg-gray-100 ">brand Name</h1>
                                <h1 className="w-full font-semibold">HEDALAI</h1>
                            </div>
                            <div className="flex gap-2 border w-[50%] justify-between items-center">
                                <h1 className="w-full border-r-2 p-2.5 bg-gray-100 ">cpu</h1>
                                <h1 className="w-full font-semibold">Deca Core</h1>
                            </div>
                            <div className="flex gap-2 border w-[50%] justify-between items-center">
                                <h1 className="w-full border-r-2 p-2.5 bg-gray-100 ">brand Name</h1>
                                <h1 className="w-full font-semibold">HEDALAI</h1>
                            </div>
                            <div className="flex gap-2 border w-[50%] justify-between items-center">
                                <h1 className="w-full border-r-2 p-2.5 bg-gray-100 ">cpu</h1>
                                <h1 className="w-full font-semibold">Deca Core</h1>
                            </div>
                        </div>
                    </div>

                </div>
            <Footer />
        </>
    )
}