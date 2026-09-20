import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { assets } from "../assets/assets"
import { ArrowUpRightIcon, ChevronDownIcon, LogOutIcon, MapPinIcon, MenuIcon, PackageIcon, SearchIcon, ShieldIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"



const Navbar = () => {

    const { user, logout } = useAuth()

    const { cartCount, setIsCartOpen } = useCart()

    const [searchQuery, setSearchQuery] = useState("")
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleSearch = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 gap-8">
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <img src={assets.logo} alt="NexiCart Logo" className='h-20 w-auto' width={205} height={48} />
                </Link>


                {/* Desktop Menu */}
                <div className="flex items-center justify-end gap-8 flex-1">

                    <div className="hidden md:flex items-center gap-1">
                        <Link to='/' className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-app-orange-dark hover:bg-orange-50 rounded-lg transition-all">Home</Link>
                        <Link to='/products' className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-app-orange-dark hover:bg-orange-50 rounded-lg transition-all">Products</Link>
                        <Link to='/deals' className="px-4 py-2 text-sm font-medium text-app-orange-dark bg-orange-50 rounded-lg">Flash Sales</Link>

                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
                        <div className="relative w-full group">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-app-orange-dark transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-app-orange-dark focus:ring-2 focus:ring-app-orange-dark/10 transition-all outline-none"
                            />
                        </div>
                    </form>

                    {/* */}
                    <div className="flex items-center gap-2">

                        {/* Cart */}
                        <button className="relative p-2.5 rounded-xl hover:bg-gray-50 transition-colors group" onClick={() => setIsCartOpen(true)}>
                            <ShoppingCartIcon className="size-5 text-gray-700 group-hover:text-app-orange-dark transition-colors" />
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 size-5 bg-app-orange-dark text-white text-[11px] font-semibold rounded-full flex-center shadow-sm">{cartCount}</span>}
                        </button>

                        {/* user */}
                        <div className="relative">
                            {user ? (
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="size-9 rounded-xl bg-gradient-to-br from-app-orange to-app-orange-dark text-white flex-center font-semibold text-sm shadow-sm">{user.name.charAt(0).toUpperCase()}</div>
                                    <ChevronDownIcon className={`size-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>
                            ) : (
                                <div className="flex-center gap-3">
                                    <Link to="/login" className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-app-orange-dark rounded-xl hover:bg-app-black transition-all shadow-sm hover:shadow">
                                        <UserIcon size={16} /> Sign In
                                    </Link>
                                    <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="md:hidden p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                                        {userMenuOpen ? <XIcon className="size-5 text-gray-700" /> : <MenuIcon className="size-5 text-gray-700" />}
                                    </button>
                                </div>
                            )}

                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in overflow-hidden">
                                        {user && (
                                            <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50/50 to-white">
                                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                                <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                                            </div>
                                        )}
                                        <div onClick={() => setUserMenuOpen(false)} className="py-2">
                                            {!user && (
                                                <Link to="/login" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <UserIcon size={16} /> Sign In
                                                </Link>
                                            )}

                                            {user && (
                                                <Link to="/orders" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <PackageIcon size={16} /> My Orders
                                                </Link>
                                            )}

                                            {user && (
                                                <Link to="/addresses" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <MapPinIcon size={16} /> Addresses
                                                </Link>
                                            )}

                                            <Link to="/products" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors md:hidden">
                                                <ArrowUpRightIcon size={16} /> Products
                                            </Link>

                                            <Link to="/deals" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors md:hidden">
                                                <ArrowUpRightIcon size={16} /> Flash Deals
                                            </Link>

                                            {user?.isAdmin && (
                                                <Link to="/delivery" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <PackageIcon size={16} /> Delivery Partner
                                                </Link>
                                            )}

                                            {user?.isAdmin && (
                                                <Link to="/admin/products" className="flex items-center gap-3 px-5 py-3 text-sm text-app-orange-dark font-medium hover:bg-orange-50 transition-colors">
                                                    <ShieldIcon size={16} /> Admin Panel
                                                </Link>
                                            )}
                                            {user && (
                                                <div className="border-t border-gray-100 pt-2 mt-2">
                                                    <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 w-full transition-colors">
                                                        <LogOutIcon size={16} /> Logout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
