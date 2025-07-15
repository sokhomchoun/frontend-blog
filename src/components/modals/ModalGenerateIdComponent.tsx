import { TModalGenerateProps } from "../../types";
export default function ModalGenerateIdComponent({ titleModal, setModalOpen, handleGenerateId }: TModalGenerateProps) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-50">
                <div className="modal bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/4 mt-10 transform transition-all duration-300 ease-out h-max">
                    <div className="modal-header flex justify-between items-center mb-4 bg-gray-100 p-3">
                        <h2 className="text-xl font-semibold">Confirmation</h2>
                        <button className="text-xl font-semibold" onClick={() => setModalOpen(false)}>&times;</button>
                    </div>
                    <div className="modal-body mb-4 p-3">
                        <p className="text-base">{ titleModal }</p>
                    </div>
                    <div className="modal-footer bg-gray-100 p-3 flex justify-end gap-2">
                        <button className="bg_default text-white px-5 py-1 hover:bg-blue-900 rounded-sm" onClick={ handleGenerateId }>Yes</button>
                        <button className="bg-red-500 text-white px-5 py-1 hover:bg-red-600 rounded-sm" onClick={() => setModalOpen(false)}>No</button>
                    </div>
                </div>
            </div>
        </>
    )
}