
export default function Footer() {
    return (
        <footer className="bg-gray-100 pt-12 pb-6 px-10 font-[sans-serif] tracking-wide">
            <div className="max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="lg:flex lg:items-center">
                    <span>
                    {/* <img src="https://readymadeui.com/readymadeui-light.svg" alt="logo" className="w-48" /> */}
                    </span>
                </div>

                <div className="lg:flex lg:items-center">
                    <ul className="flex space-x-6">
                    <li>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-7 h-7" viewBox="0 0 24 24">
                            <path fillRule="evenodd"
                            d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                            clipRule="evenodd" />
                        </svg>
                        </span>
                    </li>
                    <li>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-7 h-7" viewBox="0 0 24 24">
                            <path fillRule="evenodd"
                            d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                            clipRule="evenodd" />
                        </svg>
                        </span>
                    </li>
                    <li>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-300 hover:fill-white w-7 h-7"
                            viewBox="0 0 24 24">
                            <path
                            d="M22.92 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.83 4.5 17.72 4 16.46 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.9 20.29 6.16 21 8.58 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                        </svg>
                        </span>
                    </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg mb-6 text-gray-600">Useful links</h4>
                    <ul className="space-y-4 pl-2">
                    <li>
                        <span className="text-gray-600 hover:text-white text-sm">Featured</span>
                    </li>
                    <li>
                        <span className="text-gray-600 hover:text-white text-sm">New Arrivals</span>
                    </li>
                    <li>
                        <span className="text-gray-600 hover:text-white text-sm">New Arrivals</span>
                    </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg mb-6 text-gray-600">Information</h4>
                    <ul className="space-y-4 pl-2">
                    <li>
                        <span className="text-gray-600 hover:text-white text-sm">About Us</span>
                    </li>
                    <li>
                        <span className="text-gray-600 hover:text-white text-sm">Terms &amp; Conditions</span>
                    </li>
                    <li>
                        <span className="text-gray-600 hover:text-white text-sm">Privacy Policy</span>
                    </li>
                    <li>
                        <span className="text-gray-600 hover:text-white text-sm">Sale</span>
                    </li>
                    <li>
                        <span className="text-gray-600 hover:text-white text-sm">Documentation</span>
                    </li>
                    </ul>
                </div>
                </div>

                <p className='text-gray-300 text-sm mt-10'>© Testing. All rights reserved.
                </p>
            </div>
        </footer>
    )
}