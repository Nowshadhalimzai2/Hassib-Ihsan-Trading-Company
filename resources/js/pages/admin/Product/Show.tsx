import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';
import SectionTitle from '@/components/SectionTitle';
import { Product } from '@/types';
import { StarIcon } from 'lucide-react';
import productImg from '../../../../../public/images/cake1.png';
import AppLayout from '@/layouts/app-layout';

const Show = ({ product }: { product: Product }) => {
    // console.log('vendor name', product.category);

    return (
        <AppLayout breadcrumbs={[{ title: 'Products', href: route('products.index') }, { title: 'Product Details', href: route('products.show', product.id) }]}>
            <div className="h-screen dark:bg-slate-800">
                <SectionTitle title="Product Details" />
                <div className="translate-y-15 items-center justify-center bg-gray-50 py-6 md:flex md:translate-y-0 dark:bg-gray-800">
                    <div className="max-w-6xl rounded-md border-white py-1 md:border md:px-0 md:py-6 md:shadow-lg md:shadow-white dark:bg-gray-900">
                        <div className="flex justify-between py-4 md:space-x-30">
                            <div className="px-8">
                                {/* ======= PRODUCT NAME ========== */}
                                <div className="flex items-center space-x-2 text-lg">
                                    <span className="bg-gradient-to-r from-sky-700 via-pink-600 to-yellow-500 bg-clip-text font-semibold text-transparent italic">
                                        {product.name ? product.name : ' Business Account'}
                                    </span>
                                    {product.is_featured ? <StarIcon size={20} className="fill-yellow-500 text-yellow-500" /> : ''}
                                </div>
                                {/* 0000000 DATE LABEL 00000000 */}
                                <div className="text-sm text-gray-400">
                                    <small>{new Date(product.created_at).toLocaleDateString()}</small>
                                </div>
                            </div>
                            <div className="mr-4">
                                Vendor: <span>{product.user?.name}</span>
                                <div className="px-6 text-sm text-gray-400">Sold {0}</div>
                            </div>
                        </div>
                        {/* Product Image */}
                        <div className="relative flex w-full items-center justify-center bg-slate-600">
                            <div className="absolute top-2 right-2">
                                <PriceLabel product={product} />
                            </div>
                            <div className="absolute top-2 left-2">
                                <QuantityLabel quantity={product.quantity_in_stock} />
                            </div>
                            <img className="size-80" src={productImg} alt="No Image found" />
                        </div>
                        <p className="mt-2 flex justify-end rounded-md border px-8 py-3">{product?.description}</p>
                        {/*---------------------- Delete and Edit actions ----------------------- */}
                        <section className="DeleteUpdateSection flex justify-between px-8 pb-8 md:pb-0">
                            <EditButton EditableId={product.id} item="product" />
                            <DeleteButton item="product" DeletableId={product.id} />
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

const PriceLabel = ({ product }: { product: { unit_price: number; currency_id: number } }) => {
    return (
        <>
            <div className="absolute top-2 right-2">
                <div className="flex flex-col-reverse items-center justify-center rounded-full bg-gradient-to-r from-sky-700 to-pink-500 px-4 py-1 font-bold md:flex md:flex-row md:px-4 md:py-2">
                    <small className="mr-1 text-[10px] text-gray-700">Price/Unit</small>
                    <div>
                        <span className="mr-1 text-gray-800">{product.unit_price}</span>
                        <span className="text-slate-800">{product.currency_id == 1 ? 'Afg' : product.currency_id == 2 ? 'Pak' : 'USD'}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

const QuantityLabel = ({ quantity }: { quantity: number }) => {
    return (
        <>
            <div className="absolute top-2 left-2">
                <div className="flex flex-col-reverse items-center justify-center rounded-full bg-gradient-to-r from-sky-700 to-yellow-500 px-4 py-1 font-bold md:flex md:flex-row md:px-4 md:py-2">
                    <small className="mr-1 text-[10px] text-gray-700">Quantity</small>
                    <div>
                        <span className="mr-1 text-gray-800">{quantity}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
