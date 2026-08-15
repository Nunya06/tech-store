import { Navigate, NavLink, Outlet } from "react-router-dom";
import { PlusIcon, PackageSearchIcon, ShoppingBagIcon, LogOutIcon, BarChart3Icon, ShieldIcon, Truck } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
    const { user, loading } = useAuth();

    const AdminLinkData = [
        { to: "/admin", label: "Dashboard", icon: BarChart3Icon },
        { to: "/admin/products/new", label: "Add Product", icon: PlusIcon },
        { to: "/admin/products", label: "Products", icon: PackageSearchIcon },
        { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
        { to: "/admin/delivery-partners", label: "Delivery Partners", icon: Truck },
        { to: "/delivery", label: "Delivery Status", icon: Truck },
        { to: "/", label: "Exit", icon: LogOutIcon },
    ];
    if (loading) {
        return <></>;
    }
    if (!user?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="h-screen overflow-hidden">
            <div className="max-lg:hidden">
                <Navbar />
            </div>
            <div className="flex flex-col h-full lg:flex-row gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 animate-fade-in">
                {/* Admin Sidebar */}
                <aside className="w-full lg:w-64 shrink-0 h-fit bg-white rounded-2xl p-3 sm:p-4 border border-app-border">
                    <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-app-border">
                        <h2 className="text-base sm:text-lg font-semibold text-app-orange flex items-center gap-2 px-2">
                            <ShieldIcon className="size-4 sm:size-5 text-app-orange-dark" /> <span >Admin Panel</span>
                        </h2>
                    </div>
                    <nav className="flex flex-col gap-1 sm:gap-1.5">
                        {AdminLinkData.map((link) => (
                            <NavLink key={link.to} to={link.to} end={true} className={({ isActive }) => `flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-md text-xs sm:text-sm transition-colors ${isActive ? "bg-app-orange-dark text-white" : "text-app-text-light hover:bg-orange-50 hover:text-zinc-900"}`}>
                                <link.icon className="size-4" /> <span >{link.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>
                <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
