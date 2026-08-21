
import { assets } from "../assets/assets";

const Loading = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <img
                src={assets.logo}
                alt="Loading..."
                className="w-50 h-50 object-contain animate-pulse"
            />
        </div>
    );
};

export default Loading;
