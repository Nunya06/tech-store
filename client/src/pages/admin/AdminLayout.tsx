import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { PlusIcon, PackageSearchIcon, ShoppingBagIcon, LogOutIcon, ShieldIcon, Truck, LayoutDashboardIcon, ZapIcon, MenuIcon, XIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
    const { user, loading } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const AdminLinkData = [
        { to: "/admin", label: "Dashboard", icon: LayoutDashboardIcon },
        { to: "/admin/products/new", label: "Add Product", icon: PlusIcon },
        { to: "/admin/products", label: "All Products", icon: PackageSearchIcon },
        { to: "/admin/flash-deals", label: "Flash Deals", icon: ZapIcon },
        { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
        { to: "/admin/delivery-partners", label: "Delivery Partners", icon: Truck },
        { to: "/delivery", label: "Delivery Status", icon: Truck },
    ];

    if (loading) {
        return <></>;
    }
    if (!user?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-gradient-to-br from-app-orange to-app-orange-dark flex-center">
                        <ShieldIcon className="size-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                        <p className="text-xs text-gray-500">Management Dashboard</p>
                    </div>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {mobileMenuOpen ? <XIcon className="size-6 text-gray-700" /> : <MenuIcon className="size-6 text-gray-700" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <aside className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-50 lg:hidden flex flex-col">
                        {/* Logo/Brand */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-gradient-to-br from-app-orange to-app-orange-dark flex-center">
                                    <ShieldIcon className="size-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                                    <p className="text-xs text-gray-500">Management Dashboard</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                            {AdminLinkData.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-gradient-to-r from-app-orange to-app-orange-dark text-white shadow-md"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }`
                                    }
                                >
                                    <link.icon className="size-5" />
                                    <span>{link.label}</span>
                                </NavLink>
                            ))}
                        </nav>

                        {/* User Info & Logout */}
                        <div className="p-4 border-t border-gray-200">
                            <NavLink
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                            >
                                <LogOutIcon className="size-5" />
                                <span>Exit Admin</span>
                            </NavLink>
                        </div>
                    </aside>
                </>
            )}

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
                    {/* Logo/Brand */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-app-orange to-app-orange-dark flex-center">
                                <ShieldIcon className="size-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                                <p className="text-xs text-gray-500">Management Dashboard</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {AdminLinkData.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                        ? "bg-gradient-to-r from-app-orange to-app-orange-dark text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`
                                }
                            >
                                <link.icon className="size-5" />
                                <span>{link.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Info & Logout */}
                    <div className="p-4 border-t border-gray-200">
                        <NavLink
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                            <LogOutIcon className="size-5" />
                            <span>Exit Admin</span>
                        </NavLink>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
