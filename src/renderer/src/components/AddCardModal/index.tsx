import Sidebar from "../Sidebar"

type Props = {
    setIsModalOpen: (b: boolean) => void;
}

export default function AddCardModal({ setIsModalOpen }: Props) {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/65 p-2 z-10">
            <div className="flex flex-col border border-border h-full w-full bg-surface">
                <div className="text-gray-50 border-b border-border p-4 flex items-center">
                    <div className="flex-1 flex items-center">
                        <span className="font-bold text-xs" >ADD CARDS</span>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="cursor-pointer">
                        <span className="flex items-center gap-1 text-xs text-muted">Close <span className="text-muted text-[10px] border border-border px-2 py-0.5 bg-black/10 rounded">Esc</span></span>
                    </button>
                </div>
                <Sidebar />
            </div>
        </div>
    )
}