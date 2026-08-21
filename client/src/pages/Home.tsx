// import Features from "../components/Home/Features"
// // import Features from "../components/Home/Features";
// import Hero from "../components/Home/Hero";
// import HomeCategories from "../components/Home/HomeCategories";
// import Newsletter from "../components/Home/Newsletter";
// import PopularProducts from "../components/Home/PopularProducts";

// const Home = () => {
//     return (
//         <div>
//             <Hero />
//             {/* <Features /> */}
//             <HomeCategories />
//             <PopularProducts />
//             <Features/>
//             <Newsletter />
//         </div>
//     );
// };

// export default Home;


import { useEffect, useState } from "react";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import HomeCategories from "../components/Home/HomeCategories";
import Newsletter from "../components/Home/Newsletter";
import PopularProducts from "../components/Home/PopularProducts";
import Loading from "../components/Loading";
import api from "../config/api";
import toast from "react-hot-toast";
import type { Product } from "../types";

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const { data } = await api.get("/products?sort=rating");

                setProducts(data.products);
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message || error?.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Hero />
            <HomeCategories />
            <PopularProducts products={products} />
            <Features />
            <Newsletter />
        </div>
    );
};

export default Home;