import setupObserver from '@/components/builtIn/transition';
import { Product } from '@/types';
import { useEffect, useRef, useState } from 'react';

const WideCard = ({ product }: { product: Product }) => {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setupObserver(setIsVisible, observerRef, 0);
    }, []);

    return (
        <div
            ref={observerRef}
            className={`mx-auto my-3 flex max-w-3xl items-center rounded-xl bg-[#effa] p-3 ring-1 ring-gray-200 transition-all duration-300 hover:shadow-2xl md:my-6 md:flex-row md:items-stretch md:p-8 dark:from-white/15 dark:to-white/10 dark:ring-gray-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-50 opacity-0'} transition-all duration-700`}
        >
            <div className="ImageBox flex items-center px-1 md:pl-4">
                <img
                    src={product.images && product.images[0].image_path}
                    alt="Product"
                    className="mb-6 h-24 w-24 rounded-lg object-cover shadow-xl transition-all duration-300 md:mr-10 md:mb-0 md:h-32 md:w-32 dark:ring-green-700"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between">
                <div className="pl-2 md:pl-0">
                    <h2 className="mb-1 text-left text-xl font-extrabold tracking-tight text-gray-900 drop-shadow md:mb-3 md:text-2xl dark:text-white">
                        {product.name}
                    </h2>
                    <p className="mb-6 text-[16px] leading-relaxed text-gray-700 md:text-lg dark:text-gray-300">{product.description}</p>
                </div>
                <div className="flex items-start justify-between gap-4">
                    <span className="rounded-md bg-green-100 px-2 py-1 text-lg font-bold text-green-800 shadow md:px-3 md:py-2 md:text-2xl dark:bg-green-900 dark:text-green-200">
                        Price: {product.unit_price} {product.currency_id == 1 ? 'Afg' : product.currency_id == 2 ? 'Pak' : 'USD'}
                    </span>
                    <a
                        className="rounded-md border-2 border-white/10 bg-gradient-to-r from-[#1d5757] to-[#1c3d3d] px-2 py-1 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:border-lime-400 hover:from-10% hover:to-50% hover:text-lime-400 focus:ring-2 focus:ring-green-400 focus:outline-none md:px-3 md:py-2 dark:hover:border-[#1c3d3d] dark:hover:from-lime-500 dark:hover:to-lime-600"
                        href={`/products/${product.id}`}
                    >
                        <span className="mt-1 text-[16px]">Details</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WideCard;
