import { TButtonProps } from "../../types";

export default function ButtonCancelComponent({ onClick }: TButtonProps) {
    return (
        <>
            <button
                onClick={onClick} 
                type="button"
                className="flex items-center px-5 py-1.5 rounded-md text-sm text-white tracking-wider font-medium border border-current outline-none border-red-500 hover:bg-red-600 bg-red-500 active:bg-blue-red">
                <svg className="h-5 w-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Clear
            </button>
        </>
    )
}