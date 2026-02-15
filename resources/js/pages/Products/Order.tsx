import PageTitle from '@/components/builtIn/PageTitle';
import setupObserver from '@/components/builtIn/transition';
import Section from '@/components/Section';
import { Image } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
interface ProductProps {
    product: {
        id: number;
        name: string;
        images: Image[];
        description: string;
        unit_price: number;
        currency_id: number;
    };
}
// Main container Product
const Order = ({ product }: ProductProps) => {
    return (
        <>
            <Section className="">
                <PageTitle title="Order" />

                <div className="container mx-auto p-0 md:py-8 lg:px-8">
                    <div className="flex flex-col items-center justify-center rounded-lg xl:flex-row">
                        <ProductImage product={product} />
                        <ProductDetails product={product} />
                    </div>
                </div>
            </Section>
        </>
    );
};

// Sub Component of Product Images
const ProductImage = ({ product }: ProductProps) => {
    const [transimited, setTransimited] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [mainImage, setMainImage] = useState(product.images.filter((img) => img.is_primary == true)[0]);

    useEffect(() => {
        setupObserver(setTransimited, imgRef, 0.1);
    }, [mainImage]);
    return (
        <>
            <div className="ProductTypes relative mx-auto h-full w-full max-w-xl py-3 pr-0 lg:pr-18">
                <div className="mb-4 flex h-100 w-full items-center justify-center overflow-hidden rounded-lg bg-[#f1f4ff] object-cover shadow-lg md:mb-0 md:ml-2 lg:h-116 lg:w-144 dark:bg-slate-900">
                    <img
                        src={mainImage.image_path}
                        ref={imgRef}
                        alt={product.name}
                        className={`h-full w-full object-cover ${transimited ? 'opacity-100 transition-opacity duration-1000 ease-in' : 'opacity-0'}`}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                </div>
                <div className="absolute bottom-5 left-[25%] grid grid-cols-3 space-x-5 md:bottom-1 md:left-[30%]">
                    {product.images.map((img) => {
                        return (
                            <>
                                {' '}
                                <SubImage
                                    src={img.image_path}
                                    alt=""
                                    onClick={() => {
                                        setMainImage(img);
                                        setTransimited(false);
                                    }}
                                />
                            </>
                        );
                    })}
                    {/* <SubImage
                        src={cake2}
                        alt=""
                        onClick={() => {
                            setMainImage(cake2);
                            setTransimited(false);
                        }}
                    />
                    <SubImage
                        src={cake3}
                        alt=""
                        onClick={() => {
                            setMainImage(cake3);
                            setTransimited(false);
                        }}
                    /> */}
                </div>
            </div>
        </>
    );
};

// 00000000000000000000000000000000000000000000000000000000000000000000000000000
// Product Sub Image
const SubImage = ({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) => {
    return (
        <div
            onClick={onClick}
            className="h-15 w-15 rounded-full border-2 border-gray-900 bg-gray-500 hover:bg-lime-300 hover:ring-2 hover:ring-blue-400 md:h-18 md:w-18"
        >
            <img src={src} alt={alt} className="h-full w-full rounded-full object-cover" />
        </div>
    );
};
// 11111111111111111111111111111111111111111111111111111111111111111111111111111

// Sub Component Product Details
const ProductDetails = ({ product }: ProductProps) => {
    const { data, setData } = useForm({
        quantity: '1',
        notes: '',
    });

    const orderNow = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Order Placed', data);
    };
    return (
        <>
            <div className="h-full w-full rounded-lg py-6">
                <div className="mx-auto w-full rounded-lg bg-white/15 px-4 py-4 shadow-lg md:w-4/5">
                    <div className="flex items-center justify-between rounded-lg bg-lime-400/20 px-3 py-2 lg:px-6">
                        <h1 className="text-xl font-bold text-lime-400 lg:text-2xl">{product.name}</h1>
                        <p className="text-lg font-semibold text-lime-400 lg:text-xl">
                            Price: {product.unit_price} {product.currency_id == 1 ? 'Afg' : product.currency_id == 2 ? 'Pak' : 'USD'}
                        </p>
                    </div>
                    <div className="mb-4 py-3 text-end text-sm text-wrap">{product.description}</div>
                    <form onSubmit={orderNow} className="mt-4 flex flex-col">
                        <div className="mb-4 space-y-2">
                            <input
                                type="text"
                                placeholder="Quantity"
                                value={data.quantity}
                                onChange={(e) => setData('quantity', e.target.value)}
                                className="w-full rounded-md bg-black/10 px-3 py-2"
                            />
                            <input
                                type="text"
                                disabled
                                placeholder="Total"
                                value={data.quantity ? parseInt(data.quantity) * product.unit_price : 0}
                                className="w-full rounded-md bg-black/10 px-3 py-2"
                            />
                            <textarea placeholder="Delivery Address" className="w-full rounded-md bg-black/10 px-3 py-2" name="delivery-address" />
                            <fieldset className="text-slate-300">
                                <span className="text-red-500">Do you want to call you for varification?</span>
                                <br />
                                <div className="flex space-x-5">
                                    <label htmlFor="yes" className="space-x-2">
                                        <span>Yes</span>
                                        <input id="yes" className="" type="radio" name="call" />
                                    </label>
                                    <br />
                                    <label htmlFor="no" className="space-x-2">
                                        <span>No</span>
                                        <input type="radio" className="" id="no" name="call" />
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                        <button type="submit" disabled className="rounded-md bg-gray-400 px-6 py-2 text-white">
                            Service is not availible
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Order;
