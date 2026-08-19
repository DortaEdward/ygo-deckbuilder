
export default function Menubar() {
    function handleClose() {
        window.api.close()
    }
    function handleMinimize() {
        window.api.minimize()
    }
    function handleMaximize() {
        window.api.maximize()
    }

    return (
        <div className="h-10 shrink-0 border-b border-border flex items-center px-4 bg-shell titlebar">
            <div className="flex gap-2">
                <div
                    className="bg-red-400 rounded-full h-3 w-3 traffic cursor-pointer"
                    onClick={handleClose}
                />
                <div
                    className="bg-yellow-400 rounded-full h-3 w-3 traffic cursor-pointer"
                    onClick={handleMinimize}
                />
                <div
                    className="bg-green-400 rounded-full h-3 w-3 traffic cursor-pointer"
                    onClick={handleMaximize}
                />
            </div>
        </div>

    )
}