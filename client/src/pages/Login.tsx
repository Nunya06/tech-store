import { useState } from "react"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"
import { Loader2Icon, LockIcon, MailIcon, UserIcon } from "lucide-react"
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext"


const Login = () => {

    const [isLoginState, setIsLoginState] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


   const { login, register } = useAuth();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLoginState) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || error?.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex bg-app-cream-light">

            {/* Left */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
                <img src={assets.loginImage} alt="login Image" className="absolute inset-0 object-cover h-full bg-center" />
            </div>


            {/* right */}
            <div className="flex-1 flex-center px-4 py-12 bg-app-cream-light">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <img src={assets.logo} alt="NexiCart Logo" className='h-25 w-auto' width={205} height={48} />
                        </Link>
                        <h1>{isLoginState ? "Sign In" : "Sign Up"}</h1>
                        <p className="text-sm">
                            {isLoginState ? "Don't have an account? " : "Already have an account? "}
                            <button className="text-app-black ml-1 font-semibold hover:text-red-950 transition-colors" onClick={() => setIsLoginState(!isLoginState)} >
                                {isLoginState ? "Create Account" : "Sign In"}
                            </button>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLoginState && (
                            <div>
                                <label className="block text-sm mb-1">Name</label>
                                <div className="relative">

                                    <UserIcon className="size-4 text-app-black/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="Your name" className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-app-orange-dark" />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <div className="relative">

                                <MailIcon className="size-4 text-app-black/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-app-orange-dark" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Password</label>
                            <div className="relative">

                                <LockIcon className="size-4 text-app-black/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="........" className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-app-orange-dark" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full flex-center py-3 hover:bg-app-black text-app-white font-semibold rounded-lg bg-app-orange-dark transition-colors disabled:opacity-50">
                            {loading ? <Loader2Icon className="size-4 animate-spin " /> : isLoginState ? "Sign In" : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
