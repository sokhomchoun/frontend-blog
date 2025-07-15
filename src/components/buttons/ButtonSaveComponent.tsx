export default function ButtonSaveComponent() {

    return (
        <button type="button"
            className="px-5 py-1.5 rounded-md text-sm flex text-white tracking-wider font-medium border border-current outline-none border-blue-500 hover:bg-blue-900 bg_default active:bg-blue-900">
            <span>
                <svg className="h-5 w-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M17 3H7C5.9 3 5 3.9 5 5v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 5h10v4H7V5zm10 14H7v-6h10v6zm-8-4h2v2H9v-2zm4 0h2v2h-2v-2z"/>
                </svg>
            </span>
            Save
        </button>
    )

}