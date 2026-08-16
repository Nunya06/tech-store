import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";

const HomeCategories = () => {
    return (
        <section className="py-12 sm:py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2">Browse Categories</h2>
                    <p className="max-w-lg justify-center text-center text-sm text-app-text-light mt-1">Discover premium products at unbeatable prices curated for quality, comfort and style.</p>
                </div>


                <section className="flex items-center justify-center px-0 py-5 sm:py-10 md:py-12">
                    <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-2 md:gap-3">
                        {categoriesData.map((cat) => (
                            <Link to={`/products?category=${cat.slug}`} onClick={() => window.scrollTo(0, 0)} key={cat.slug} className="transition-colors rounded-xl p-1 flex flex-col w-40 sm:w-30 md:w-35 lg:w-45 hover:scale-105">

                                {/* Product Image */}
                                <div className="flex items-center justify-center h-30 sm:h-30 md:h-35 lg:h-45 mb-2 bg-app-cream rounded-xl">
                                    <img src={cat.image} alt={cat.name} className="max-h-full max-w-full object-contain" />
                                </div>

                                {/* Product Name */}
                                <p className="font-medium text-neutral-500 mb-2 px-2 text-sm sm:text-base">{cat.name}</p>
                                <p className="text-xs sm:text-sm text-neutral-500 mb-2 px-2">{cat.desc}</p>


                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </section>
    );
};

export default HomeCategories;
