import Card from '@/components/products/Card';
import TopRankCard from '@/components/products/TopRankCard';
import Section from '@/components/Section';
import MYLayout from '@/layouts/MYLayout';
import 'swiper/css';
import 'swiper/css/navigation';

import CircleCard from '@/components/products/CircleCard';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Hero from '@/components/products/Hero';
import { Category, Product } from '@/types';
import b1 from '../../../../public/images/g_eathing.jpg';
import b2 from '../../../../public/images/img1.jpg';
import b3 from '../../../../public/images/img2.jpg';
interface Props {
    products: Product[];
    categories: Category[];
}
const Index = ({ products, categories }: Props) => {
    // This component can be used to display a list of products, product details, etc.
    console.log('products: ', products);

    const images = [b1, b2, b3];
    const toprankcards = images.map((img, index) => {
        return (
            <div className="grid grid-cols-1 space-y-4 space-x-2 sm:grid-cols-2 md:grid-cols-3 md:space-y-0">
                <SwiperSlide key={index} className="rounded-lg">
                    <TopRankCard image={img} />
                </SwiperSlide>
            </div>
        );
    });
    const ourproducts = products.map((product, index) => {
        return <Card product={product} key={index} img={product.images.filter((img) => img.is_primary == true)[0]} />;
    });
    return (
        <>
            <MYLayout>
                {/* Hero Section */}
                <Hero />

                {/* top and featured Product page content goes here */}

                <section className="px-4 py-12">
                    <h1 className="mb-6 py-4 text-center text-3xl font-bold">Our Products</h1>
                    <div className="mb-4 w-full py-8">
                        {/* Example product cards */}

                        <div className="grid space-y-4 gap-x-3 md:grid-cols-3">{ourproducts}</div>

                        <div className="mt-4 flex w-full pt-3">
                            <a href="/products/productlist" className="w-full text-center hover:text-lime-400">
                                View All Products
                            </a>
                        </div>
                    </div>
                </section>

                {/*             ------------CATEGORIES --------------- */}
                <Section className="rounded-xl bg-white/40 py-8 dark:bg-slate-800">
                    <div className="Category">
                        <div className="">
                            <h1 className="text-center text-3xl font-bold">Categories</h1>
                            <p className="text-center text-gray-500">Explore our diverse range of categories</p>
                        </div>
                        <div className="Contents my-4 px-2 py-8">
                            <div className="Category">
                                <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3">
                                    {categories.map((category) => (
                                        <CircleCard key={category.id} category={category} />
                                    ))}
                                </div>
                                <div className="ViewAll mt-6 text-center">
                                    <a href={`/products/categories`} className="text-md text-center hover:text-lime-400">
                                        View All Categories
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                <Section className="dark:bg-slate-900">
                    <div className="px-4 py-8">
                        <h1 className="mb-6 py-4 text-center text-3xl font-bold">Discover Our Products</h1>

                        <div className="flex flex-col items-center justify-between space-y-4 space-x-0 px-4 py-2 md:flex-row md:space-y-0 md:space-x-4">
                            <div className="TopRanking w-full rounded-lg bg-[#1c3d3d] p-2 px-5 md:max-w-[30%] md:min-w-[20%] dark:bg-white/15">
                                <Swiper
                                    modules={[Autoplay, Pagination, Navigation]}
                                    spaceBetween={20}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                        renderBullet: (index, className) => {
                                            return `<span key="${index}" class="${className}"></span>`;
                                        },
                                    }}
                                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                                    allowTouchMove
                                    navigation={false}
                                    className="w-full"
                                >
                                    {toprankcards}
                                </Swiper>
                            </div>

                            {/* New arrival */}
                            <div className="NewArrival grow rounded-lg bg-white/40 dark:bg-white/15">
                                <div className="flex flex-col items-center justify-center px-0 py-3 md:px-4">
                                    <h4 className="py-4 text-xl font-bold">New Arrival</h4>

                                    <div className="animate-pulse transition-all hover:animate-none">
                                        <img src={b2} className="h-100 rounded-lg object-fill" alt="" />
                                    </div>
                                    <div className="Details py-4 text-[#1c3d3e]">
                                        <p className="px-3 text-gray-500 dark:text-gray-300">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quas sequi odio expedita reprehenderit
                                            Quaerat quas sequi odio expedita reprehenderit
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Top Deals
                            <div className="TopDeals rounded-lg bg-white p-2">
                                <h4 className="text-xl">Top Deals</h4>
                                <h5 className="text-gray-500">Cookies</h5>
                            </div> */}
                        </div>
                    </div>
                </Section>
            </MYLayout>
        </>
    );
};

export default Index;
