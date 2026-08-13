import { useEffect, useState } from "react";
import type { Product } from "../types";
import { Zap } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import api from "../config/api";
import toast from "react-hot-toast";

const FlashDeals = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/products/flash-deals")
            .then((res) => setProducts(res.data.products))
            .catch((error: any) => toast.error(error.response.data.message || error?.message))
            .finally(() => setLoading(false));
    }, []);

  return (
    <div className="min-h-screen bg-app-cream">
      {/* Banner */}
      <div className="bg-app-black py-8 sm:py-8 lg:py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-6 shadow-sm">
              <span className="text-app-white text-xs font-semibold tracking-wide">FLASH DEALS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-5xl font-semibold text-app-orange-dark mb-4 max-w-3xl leading-tight">
              Lightning-Fast Savings
            </h1>

            <p className="text-lg text-app-text-light max-w-2xl mx-auto">
              Limited-time offers on your favorite organic products. Grab them before they're gone!
            </p>
          </div>
        </div>
      </div>
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Zap className="size-16 text-app-border mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-app-orange-dark mb-2">No deals right now</h2>
            <p className="text-sm text-app-text-light">Check back soon for amazing offers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => product.flashdeal === 1 &&
              <ProductCard key={product.id} product={product}
              />)}</div>
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
