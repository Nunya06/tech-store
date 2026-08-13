import Features from "../components/Home/Features"
// import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import HomeCategories from "../components/Home/HomeCategories";
import Newsletter from "../components/Home/Newsletter";
import PopularProducts from "../components/Home/PopularProducts";

const Home = () => {
    return (
        <div>
            <Hero />
            {/* <Features /> */}
            <HomeCategories />
            <PopularProducts />
            <Features/>
            <Newsletter />
        </div>
    );
};

export default Home;
