export default function DeleteItemDisplay() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
            <div className="bg-white w-64 p-4 text-center rounded-2xl">
                <h1>Delete this item?</h1>
                <div className="flex flex-row">
                    <button>Yes</button>
                    <button>No</button>
                </div>
            </div>
        </div>
    )
}