import { Image, Product } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import setupObserver from '../builtIn/transition';
interface Props {
    img: Image;
    product: Product;
}
const Card = ({ img, product }: Props) => {
    // Function to handle navigation to product details
    const NavigateTo = () => {
        router.get(`/products/${product.id}`);
    };

    const observerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setupObserver(setIsVisible, observerRef, 0.5);
    }, []);

    return (
        <>
            <div
                ref={observerRef}
                onClick={NavigateTo}
                className={`relative w-full rounded-lg border-1 bg-[#f0f4ff] px-3 py-2 hover:scale-102 hover:cursor-pointer hover:border-1 hover:shadow-lg dark:bg-white/5 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-30 opacity-0'} transition-all duration-700`}
            >
                <img src={img && img.image_path} alt="Product 1" className="object-cover" />
                <div className="rounded-lg px-3 py-4">
                    <div className="ExpiryDateAndPrice">
                        <div className="absolute top-3 right-3 rounded-2xl bg-lime-300 px-2 py-1 text-white dark:text-slate-800">
                            <p className="" title="Price">
                                Price:{product.unit_price}
                            </p>
                        </div>
                        <div
                            className="ExpiryDate absolute top-3 left-3 w-22 rounded-2xl bg-red-300 px-2 py-1 text-white dark:text-slate-800"
                            title="Expiration Date"
                        >
                            <p>{new Date(product.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-center text-2xl font-extrabold">{product.name}</h2>
                        <p className="text-center text-gray-500 dark:text-gray-300">{product.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
