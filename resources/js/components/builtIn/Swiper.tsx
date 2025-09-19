import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';
interface SwiperProps {
    children: React.ReactNode;
}

const Swiper1 = ({ children }: SwiperProps) => {
    return (
        <>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className}"></span>`;
                    },
                }}
                breakpoints={{
                    1148: { slidesPerView: 4 }, // Desktop
                    948: { slidesPerView: 3 }, // iPad and larger
                    615: {
                        slidesPerView: 2,
                    },
                }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                allowTouchMove
                navigation={false}
                className="w-full"
            >
                {children}
            </Swiper>
        </>
    );
};

export default Swiper1;
