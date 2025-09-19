import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useRef, useState } from 'react';
import gcake from '../../../../public/images/g_eathing.jpg';
import cake1 from '../../../../public/images/img1.jpg';
import cake2 from '../../../../public/images/img2.jpg';
import setupObserver from '../builtIn/transition';
const OurProducts = () => {
    const categories = [
        {
            img: cake1,
            title: 'Indulge in Our Crunchy and Flavorfull Biscuits',
            description:
                'Each biscuit is a delightful experience, baked to perfection with a golden crunch and rich flavors. Perfect for daily treats, tea-time snacks, or sharing with loved ones. Discover a variety of options to satisfy every craving.',
        },
        {
            img: cake2,
            title: 'Refresh Yourself with Our Exquisite Juice Selection',
            description:
                'Our juices are made from fresh, handpicked fruits, delivering a burst of natural flavors in every sip. Enjoy a refreshing and healthy beverage, ideal for any time of the day. Choose from a wide range of delicious and nutritious options.',
        },
        {
            img: gcake,
            title: 'Explore Our Unique Flavors and Varieties of Cakes',
            description:
                'Our cakes are crafted with the finest ingredients to ensure quality and taste. From classic favorites to innovative creations, each cake is moist, flavorful, and beautifully decorated—perfect for celebrations or a sweet treat any day.',
        },
    ];
    const ourproducts = categories.map((category, index) => {
        return <OurProduct key={index} productimg={category.img} index={index} title={category.title} description={category.description} />;
    });
    return (
        <>
            <section className="bg-[#f0f0f0] py-16">
                <h1 className="mb-20 text-center text-xl font-extrabold text-slate-900 md:text-3xl">
                    Discover our Delicious Range of Items for Every Occasion
                </h1>

                <div className="">{ourproducts}</div>
            </section>
        </>
    );
};

interface Props {
    productimg: string;
    title: string;
    description: string;
    index: number;
}
const OurProduct = ({ productimg, title, description, index }: Props) => {
    // SET OBSERVER FOR THE PRODUCT IMAGE
    const [isVisible, setIsVisible] = useState(false);
    const productDivRef = useRef<HTMLElement>(null);
    useEffect(() => {
        setupObserver(setIsVisible, productDivRef, 0);
    }, []);

    return (
        <>
            <div
                className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mx-auto mb-12 max-w-5xl flex-col justify-center space-y-3 space-x-0 md:mb-0 md:space-y-0 md:space-x-3 md:py-12`}
            >
                <div
                    ref={productDivRef}
                    className={` ${isVisible ? 'translate-x-0 opacity-100 ease-in' : '-translate-x-50 opacity-0'} transition-all duration-700`}
                >
                    <img src={productimg} className={`max-w-107`} alt="" />
                </div>
                <div className="px-3 md:px-6">
                    <h2 className="mb-6 text-2xl font-bold text-wrap text-slate-800">{title}</h2>
                    <p className="text-sm text-gray-600 md:text-[16px]">{description}</p>
                </div>
            </div>
        </>
    );
};
export default OurProducts;
