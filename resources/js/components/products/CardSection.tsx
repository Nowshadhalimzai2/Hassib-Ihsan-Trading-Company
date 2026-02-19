import GrayCard from '@/components/products/GrayCard';
import { Product } from '@/types';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cake2 from '../../../../public/images/cake2.png';
import cake3 from '../../../../public/images/cake3.png';
import { default as bgimg } from '../../../../public/images/sss.jpg';
import watch1 from '../../../../public/images/watch1.png';
import setupObserver from '../builtIn/transition';
const CardSection = ({ products }: { products: Product[] }) => {
    const images = [bgimg, cake2, cake3, watch1];
    const divRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const cards = products.map((product, index) => {
        return (
            <div
                ref={divRef}
                className={`grid grid-cols-1 space-y-4 space-x-2 sm:grid-cols-2 md:space-y-0 lg:grid-cols-3 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            >
                <SwiperSlide key={index} className="w-64 rounded-lg bg-slate-900">
                    <GrayCard
                        id={index + 1}
                        productImage={product.images[0]?.image_path || images[index % images.length]} // Fallback to default image if product image is not available
                        itemName={product.name}
                        itemDescription={product.description}
                    />
                </SwiperSlide>
            </div>
        );
    });

    useEffect(() => {
        setupObserver(setIsVisible, divRef as React.RefObject<HTMLDivElement>, 0);
    }, []);

    return (
        <>
            <section
                ref={divRef}
                className={`container mx-auto rounded-lg border-b-2 px-0 py-8 transition-all duration-1000 ease-in-out md:px-20 ${isVisible ? 'scale-100 opacity-100' : 'scale-20 opacity-0'}`}
            >
                <h1 className="pb-20 text-center text-lg font-bold text-gray-800 md:text-3xl dark:text-white">Top Trendings</h1>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        renderBullet: (index, className) => {
                            return `<span key={index} class="${className}"></span>`;
                        },
                    }}
                    breakpoints={{
                        768: { slidesPerView: 3 }, // iPad and larger
                        615: {
                            slidesPerView: 2,
                        },
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    allowTouchMove
                    navigation={false}
                    className="w-full"
                >
                    {cards}
                </Swiper>
            </section>
        </>
    );
};

export default CardSection;
