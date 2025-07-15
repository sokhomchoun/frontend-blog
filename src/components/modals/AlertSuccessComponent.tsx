
import { TMessageProps } from "../../types";
export default function AlertSuccessComponent({ message }: TMessageProps) {
    return (
        <>
            <div className="absolute top-1 z-50 right-1 bg-green-200 p-4 rounded">
                <div className="flex items-center">
                    <svg className="w-[48px] h-[48px] text-gray-800 dark:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <div>
                        <h1 className="text-xl font-semibold dark:text-green-600">Success !</h1>
                        <p className="dark:text-green-600">{ message }</p>
                    </div>
                </div>
            </div>
        </>
    )
}