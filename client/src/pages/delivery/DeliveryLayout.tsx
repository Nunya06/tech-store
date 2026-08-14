import { Outlet, useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { DeliveryPartner } from "../../types";
import { assets, dummyDeliveryPartnerData } from "../../assets/assets";

export default function DeliveryLayout() {
    const navigate = useNavigate();
    const [partner, setPartner] = useState<DeliveryPartner | null>(null);

    useEffect(() => {
        // Validate delivery token locally (decode exp) and prefer the authenticated delivery partner from localStorage
        const token = localStorage.getItem("delivery_token");
        const stored = localStorage.getItem("delivery_partner");

        const isTokenExpired = (t: string | null) => {
            if (!t) return true;
            try {
                const payload = JSON.parse(atob(t.split(".")[1]));
                if (!payload.exp) return false;
                const now = Math.floor(Date.now() / 1000);
                return payload.exp < now;
            } catch (e) {
                return true;
            }
        };

        if (!token || isTokenExpired(token)) {
            // no valid token - redirect to delivery login
            localStorage.removeItem("delivery_token");
            localStorage.removeItem("delivery_partner");
            navigate("/delivery/login");
            return;
        }

        if (stored) {
            try {
                setPartner(JSON.parse(stored) as DeliveryPartner);
                return;
            } catch (e) {
                // fallthrough to dummy data
            }
        }

        setPartner(dummyDeliveryPartnerData[0] as DeliveryPartner);
    }, [navigate]);

    const handleLogout = () => {
        // Clear delivery auth and redirect to homepage
        localStorage.removeItem("delivery_token");
        localStorage.removeItem("delivery_partner");
        navigate("/delivery/login");
    };

    if (!partner) return null;

    return (
        <div className="min-h-screen bg-app-cream">
            {/* Top Bar */}
            <header className="bg-white border-b border-app-border sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        
                            <img src={assets.logo} alt="NexiCart Logo" className='h-25 w-auto' width={205} height={48} />
                       
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-zinc-600">{partner.name}</span>
                        <button onClick={handleLogout} className="p-2 text-zinc-500 hover:text-app-white hover:bg-app-orange-dark rounded-lg transition-colors">
                            <LogOutIcon className="size-4" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
