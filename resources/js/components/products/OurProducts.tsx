import 'swiper/css';
import 'swiper/css/navigation';

import { HomeSec4Types } from '@/types/trans_types';
import { useEffect, useRef, useState } from 'react';
import gcake from '../../../../public/images/g_eathing.jpg';
import cake1 from '../../../../public/images/img1.jpg';
import cake2 from '../../../../public/images/img2.jpg';
import setupObserver from '../builtIn/transition';
const OurProducts = ({ translation }: { translation: HomeSec4Types }) => {
    const categories = [
        {
            title: `${translation.home.sec4_title1}`,
            description: `${translation.home.sec4_para1}`,
            img: cake1,
        },
        {
            title: `${translation.home.sec4_title2}`,
            description: `${translation.home.sec4_para2}`,
            img: cake2,
        },
        {
            title: `${translation.home.sec4_title3}`,
            description: `${translation.home.sec4_para3}`,
            img: gcake,
        },
    ];
    const ourproducts = categories.map((category, index) => {
        return <OurProduct key={index} productimg={category.img} index={index} title={category.title} description={category.description} />;
    });
    return (
        <>
            <section className="bg-[#f0f0f0] py-16 dark:bg-slate-800/10">
                <h1 className="mb-20 text-center text-xl font-extrabold text-slate-900 md:text-3xl dark:text-white">{translation.home.sec4_title}</h1>

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
                    <h2 className="mb-6 font-serif text-2xl font-bold text-wrap text-slate-800 dark:text-white">{title}</h2>
                    <p className="text-md font-serif text-gray-600 md:text-lg md:text-[16px] dark:text-gray-300">{description}</p>
                </div>
            </div>
        </>
    );
};
export default OurProducts;
