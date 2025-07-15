
export default function AlertFailComponent() {
    return (
        <>
            <div className="absolute top-1 z-50 right-1 bg-red-50 p-4 rounded">
                <div className="flex items-center gap-3">
                    <svg className="w-[48px] h-[48px] text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    </svg>
                    <div>
                        <h1 className="text-xl font-semibold dark:text-red-600">Failed !</h1>
                        <p className="dark:text-black">Your prouct type add fialed !</p>
                    </div>
                </div>
            </div>
        </>
    )
}