import { prisma } from "./config/prisma.js";

const seedDB = async () => {
    try {
        await prisma.product.deleteMany({});
        console.log("Cleared existing products");

        const products: any = [
            {
                name: "Samsung Galaxy S24 Ultra",
                description: "Premium flagship smartphone with powerful performance, pro-grade camera, and vibrant display.",
                price: 4599,
                originalPrice: 5899,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7V7HL1Es63NN25fqL8lpQbLMtpmsXrMey3DCsjIILDg&s=10",
                category: "smartphones",
                stock: 100,
                flashdeal: 1,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "Iphone 16 ProMax",
                description: "Advanced smartphone with fast chipset, cinematic camera system, and elegant glass design.",
                price: 9000,
                originalPrice: 10000,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDv-aukR_2H7s80ODqqxDtaiiy7SkxV_eX1Chj7rpoew&s=10",
                category: "smartphones",
                stock: 100,
                flashdeal: 1,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "Samsung Galaxy S25 Ultra",
                description: "Next-generation Galaxy Ultra with advanced features, long battery life, and sleek design.",
                price: 5420,
                originalPrice: 6050,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHLDSF_Nk9g0HAXgOdtcIaqqMZdaYBEdlQ_rjC-IyBww&s=10",
                category: "smartphones",
                stock: 100,
                flashdeal: 0,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "Apple Ultra 2",
                description: "Stylish smartwatch with health monitoring, customizable faces, and long battery life.",
                price: 845,
                originalPrice: 950,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRS2G6dRtxTrKkW-de3_h4bRD9X5M_Yju7KwpO9_GsQw&s=10",
                category: "accessories",
                stock: 100,
                flashdeal: 0,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "Apple AirPods ProMax",
                description: "Feel cool and enjoy the rhythm.",
                price: 845,
                originalPrice: 950,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzqXLtPHVpEDH5BF0aGwbUwt62RtY_gJGyZkee7TBiyg&s=10",
                category: "accessories",
                stock: 100,
                flashdeal: 1,
                rating: 4.5,
                reviewCount: 12,
            },

            {
                name: "Apple AirPods Max2",
                description: "Feel cool and enjoy the rhythm.",
                price: 745,
                originalPrice: 850,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8KUN_1vmb-ovHScy_VXtmW1kyiRaFDzECzi-rUTCD6A&s=10",
                category: "accessories",
                stock: 100,
                flashdeal: 1,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "Iphone 14 ProMax",
                description: "Flagship phone with ProMotion display, powerful performance, and exceptional camera capabilities.",
                price: 6045,
                originalPrice: 7050,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqlVoCIfJxLP5AAwcE_JTU9HZEs_HpBOEPx0ThmJgcWg&s=10",
                category: "smartphones",
                stock: 100,
                flashdeal: 1,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "Fast Iphone Type-C Charger",
                description: "Fast charging accessory for your iPhone 14.",
                price: 49,
                originalPrice: 59,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVonMq8ZoY22Eo6krYDr6kcHqLkgm11FNl9ezeN_gYKw&s=10",
                category: "accessories",
                stock: 100,
                flashdeal: 0,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "Iphone 17 ProMax",
                description: "Advanced smartphone with fast chipset, cinematic camera system, and elegant glass design.",
                price: 13000,
                originalPrice: 15000,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeNXxAZhHpqSVijFYQ_QZLXIqultI-XYkhdQ3Wh5gmoA&s=10",
                category: "smartphones",
                stock: 100,
                flashdeal: 1,
                rating: 4.5,
                reviewCount: 12,
            },

            {
                name: "Sony PlayStation 5",
                description: "Premium gaming console for next-gen titles, high-fidelity audio, and responsive controls.",
                price: 2745,
                originalPrice: 3950,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2HGrK78rRS5oG5TUIjzN1OP2LmfdqK84mChNP4P-iCw&s=10",
                category: "gaming",
                stock: 100,
                flashdeal: 1,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "Tecno Camon Slim",
                description: "Flagship phone with ProMotion display, powerful performance, and exceptional camera capabilities.",
                price: 5045,
                originalPrice: 6050,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2bLbzzF8L-2Gf1JnRZgSCfypbKnR0szVvS5LcJuo61A&s=10",
                category: "smartphones",
                stock: 100,
                flashdeal: 1,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "MacBook Pro, M4 16-inch",
                description: "Professional laptop with powerful processors, brilliant Retina display, and pro-grade performance.",
                price: 10245,
                originalPrice: 11450,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwgavlcE7UnAfSS--5N3lXcK4Q8zYdUXiYuup-vy-W0w&s=10",
                category: "laptops",
                stock: 100,
                flashdeal: 0,
                rating: 4.5,
                reviewCount: 12,
            },
            {
                name: "Iphone 14",
                description: "Flagship phone with ProMotion display, powerful performance, and exceptional camera capabilities.",
                price: 5045,
                originalPrice: 6050,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBRu97KEtJISLvjlywQP4s7BoAVLvnC4s7oVLTeeGrKg&s=10",
                category: "smartphones",
                stock: 100,
                flashdeal: 1,
                rating: 4.5,
                reviewCount: 12,
            },
            
            {
                name: "HP Omen 16-inch",
                description: "Professional laptop with powerful processors, brilliant Retina display, and pro-grade performance.",
                price: 13245,
                originalPrice: 14450,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn5BQtOMhO4S--m2U1BiG5PC8DWzkAllZKj1vFfUan5w&s=10",
                category: "laptops",
                stock: 100,
                flashdeal: 0,
                rating: 4.5,
                reviewCount: 12,
            },

        ];

        await prisma.product.createMany({ data: products });
        console.log(`Created ${products.length} products`);

        console.log("Seed completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

seedDB();
