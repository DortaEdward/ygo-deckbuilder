import Menubar from "@renderer/components/menubar";
import Sidebar from "@renderer/components/Sidebar";
import { Outlet } from "react-router";

export default function DefaultLayout() {
    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden bg-background">
            <Menubar />
            <main className="flex-1 min-w-0 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}