import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PackageIcon, UsersIcon, ShoppingBagIcon, AlertTriangleIcon, ZapIcon } from "lucide-react";
import Loading from "../../components/Loading";
import { statusColors } from "../../assets/assets";
import api from "../../config/api";

interface Stats {
    totalOrders: number;
    totalUsers: number;
    totalProducts: number;
    outOfStock: number;
    flashDeals: number;
    recentOrders: any[];
}

export default function AdminDashboard() {
    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/admin/stats")
            .then((res) => setStats(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const cards = stats
        ? [
            { label: "Total Orders", value: stats.totalOrders, icon: ShoppingBagIcon, color: "bg-orange-50 text-app-orange-dark" },
            { label: "Total Users", value: stats.totalUsers, icon: UsersIcon, color: "bg-blue-50 text-blue-600" },
            { label: "Total Products", value: stats.totalProducts, icon: PackageIcon, color: "bg-green-50 text-green-600" },
            { label: "Flash Deals", value: stats.flashDeals, icon: ZapIcon, color: "bg-yellow-50 text-yellow-600" },
            { label: "Out of Stock", value: stats.outOfStock, icon: AlertTriangleIcon, color: "bg-red-50 text-red-600" },
        ]
        : [];

    if (loading) return <Loading />;

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                {cards.map((card) => (
                    <div key={card.label} className="bg-white rounded-2xl p-3 sm:p-5 border border-app-border flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3">
                        <div className="min-w-0">
                            <p className="text-xl sm:text-2xl font-semibold text-zinc-900">{card.value}</p>
                            <p className="text-xs sm:text-sm text-app-text-light truncate">{card.label}</p>
                        </div>
                        <div className={`size-9 sm:size-10 rounded-xl flex-center ${card.color} shrink-0`}>
                            <card.icon className="size-4 sm:size-5" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-app-border overflow-hidden">
                <div className="px-3 sm:px-6 py-3 sm:py-5 border-b border-app-border flex items-center justify-between gap-2">
                    <h2 className="text-base sm:text-lg font-semibold text-zinc-900">Recent Orders</h2>
                    <Link to="/admin/orders" className="text-xs sm:text-sm font-medium text-app-orange hover:text-app-orange-dark transition-colors whitespace-nowrap">
                        View All →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm whitespace-nowrap">
                        <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-2 sm:px-6 py-2 sm:py-3">Order ID</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3">Customer</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3">Items</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3">Total</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3">Status</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-app-border">
                            {stats?.recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-3 sm:px-6 py-6 sm:py-8 text-center text-zinc-500">
                                        No orders yet.
                                    </td>
                                </tr>
                            ) : (
                                stats?.recentOrders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-zinc-500">#{order.id.slice(-6).toUpperCase()}</td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-zinc-900">{order.user?.name || "—"}</p>
                                            <p className="text-xs text-zinc-500">{order.user?.email || ""}</p>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600">{order.items?.length || 0} items</td>
                                        <td className="px-6 py-4 font-medium">
                                            {currency}
                                            {order.total?.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-zinc-100 text-zinc-600"}`}>{order.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
