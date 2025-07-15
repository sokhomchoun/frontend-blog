import { TButtonProps } from "../../types"
export default function ButtonAddComponent({ textButton }: TButtonProps) {
    return (
        <>
            <button type='button'  className='text-white px-4 py-2 rounded text-[13px] h-[35px] flex items-center gap-2 border-blue-800 hover:bg-blue-900 bg-blue-800 active:bg-blue-900'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                { textButton }
            </button>
        </>
    )
}