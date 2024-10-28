interface DeleteItemDisplayProps {
    onConfirm: () => void; // Function to call on confirm
    onCancel: () => void; // Function to call on cancel
}

export default function DeleteItemDisplay({ onConfirm, onCancel }: DeleteItemDisplayProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
            <div className="bg-white w-64 p-4 text-center rounded-2xl">
                <h1>Delete this item?</h1>
                <div className="flex flex-row items-center justify-center text-white mt-4">
                    <button onClick={onConfirm} className="mx-2 p-1 bg-red-500 rounded-md w-16 hover:bg-red-400">Yes</button>
                    <button onClick={onCancel} className="mx-2 p-1 bg-green-500 rounded-md w-16 hover:bg-zinc-400">No</button>
                </div>
            </div>
        </div>
    );
}
