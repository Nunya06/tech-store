
import ProductCard from '../ProductCard'
import { ArrowRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from "../../config/api";
import toast from "react-hot-toast";
import { useEffect, useState } from 'react';
import type { Product } from '../../types';

const PopularProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get("/products?sort=rating")
            .then(({ data }) => {
                setProducts(data.products);
            })
            .catch((error: any) => {
                toast.error(error.response.data.message || error?.message);
            });
    }, []);
    const navigate = useNavigate()

    return (
        <section className="pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col justify-center items-center mb-8 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2">Popular Products</h2>
                    <p className="max-w-lg justify-center text-center text-sm text-app-text-light mt-1">Discover premium products at unbeatable prices curated for quality, comfort and style.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
                    {products.slice(0,10).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
                    <button onClick={() => { window.scrollTo(0, 0); navigate('/products'); }} className="px-4 sm:px-5 py-3 text-white bg-app-orange-dark font-semibold rounded-lg hover:bg-app-black transition-colors flex items-center gap-2 text-sm sm:text-base">
                        View All Products
                        <ArrowRightIcon className="size-4" />
                    </button>
                </div>

            </div>
        </section>
    );
}

export default PopularProducts
