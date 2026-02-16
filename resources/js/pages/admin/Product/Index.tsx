import FlashMessage from '@/components/builtIn/FlashMessage';
import AppLayout from '@/layouts/app-layout';
import { Product as ProductType } from '@/types';
import { usePage } from '@inertiajs/react';

const Index = ({ products }: { products: ProductType[] }) => {
    const message = usePage().props.flash as { error: string | null; success: string | null };

    const product_list = products.map((product) => {
        return <ProductItem product={product} />;
    });
    return (
        <>
            <AppLayout>
                <FlashMessage duration={5000} message={message} />
                <div>
                    <h1 className="my-5 py-3 text-center font-bold sm:text-2xl md:my-8 md:py-6 md:text-3xl lg:text-4xl">Products in Stock</h1>
                    <div className="m-3">{product_list}</div>
                </div>
            </AppLayout>
        </>
    );
};

const ProductItem = ({ product }: { product: ProductType }) => {
    return (
        <>
            <a href={route('products.show', product.id)} className="">
                <div
                    className={`mx-2 mt-1 flex w-full justify-between rounded-sm border border-white px-4 py-3 transition-all duration-300 hover:scale-101 hover:border hover:border-white hover:shadow-lg md:border-gray-700`}
                >
                    <span>{product.name}</span>
                    <span>{product.quantity_in_stock}</span>
                    <span>{product.unit_price}</span>
                    <span>{product.currency_id == 1 ? 'Afg' : product.currency_id == 2 ? 'Pak' : 'USD'}</span>
                </div>
            </a>
        </>
    );
};
export default Index;
