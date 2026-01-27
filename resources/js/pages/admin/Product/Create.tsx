import InputError from '@/components/input-error';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Props {
    vendors: { name: string; company: string; id: number; address: string }[];
    categories: { id: number; name: string }[];
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/admin/products',
    },
];
export type ProductType = {
    name: string;
    user_id: number | null;
    quantity_in_stock: number;
    currency_id: number;
    description: string;
    category_id: number;
    is_featured: boolean;
    unit_price: number;
};
const Index = ({ vendors, categories }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm<ProductType>({
        name: '',
        user_id: null,
        unit_price: 1,
        currency_id: 1,
        quantity_in_stock: 1,
        description: '',
        category_id: 1,
        is_featured: false,
    });
    // console.log(vendors[0].id);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            onFinish: () =>
                reset(
                    'name',
                    'user_id',
                    'unit_price',
                    'currency_id',
                    'quantity_in_stock',
                    'description',
                    'category_id',
                    'is_featured',
                    // 'product_images',
                ),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* ===================== PRODUCT FORM SECTION ======================= */}
            <Section className="to-yellow-5 0 bg-gradient-to-bl from-pink-50 via-sky-50 dark:from-gray-950 dark:via-slate-900 dark:to-black">
                <div>
                    <h1 className="my-6 py-4 text-center text-2xl font-bold">Purchase Product</h1>
                </div>
                <form className="flex min-h-screen flex-col rounded-lg p-6 lg:gap-y-0" onSubmit={submit}>
                    <div className="">
                        <div className="grid gap-y-4 lg:gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="دلپذیر کیک"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="destination_id" title="whome do you purchased the product from? ">
                                    Vendor
                                </Label>
                                <select
                                    tabIndex={1}
                                    name="user_id"
                                    id="user_id"
                                    onChange={(e) => setData('user_id', Number(e.target.value))}
                                    className="rounded-md border border-gray-300 p-2"
                                >
                                    <option value="" className="text-gray-400 dark:bg-slate-800">
                                        Select Vendor...
                                    </option>
                                    {vendors.map((vendor) => (
                                        <option key={vendor.id} value={vendor.id} className="rounded-md dark:bg-slate-800">
                                            {vendor.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.user_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Price per Unit</Label>
                                <Input
                                    id="unit_price"
                                    type="unit_price"
                                    required
                                    tabIndex={3}
                                    autoComplete="unit_price"
                                    value={data.unit_price}
                                    onChange={(e) => setData('unit_price', Number(e.target.value))}
                                    disabled={processing}
                                    placeholder="250"
                                />
                                <InputError message={errors.unit_price} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="text"
                                    required
                                    tabIndex={4}
                                    autoComplete="quantity"
                                    value={data.quantity_in_stock}
                                    onChange={(e) => setData('quantity_in_stock', Number(e.target.value))}
                                    disabled={processing}
                                    placeholder="quantity of Products"
                                />
                                <InputError message={errors.quantity_in_stock} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="currency_id">Currency</Label>
                                <select
                                    className="rounded-md border border-gray-300 p-2"
                                    tabIndex={1}
                                    name="user_id"
                                    id="currency_id"
                                    onChange={(e) => setData('currency_id', Number(e.target.value))}
                                >
                                    <option value="" className="text-gray-400 dark:bg-slate-800">
                                        Select Curreny...
                                    </option>
                                    <option value={1} className="dark:bg-slate-800">
                                        Afghani
                                    </option>
                                    <option value={2} className="dark:bg-slate-800">
                                        PKR
                                    </option>
                                    <option value={3} className="dark:bg-slate-800">
                                        USD
                                    </option>
                                </select>
                                <InputError message={errors.currency_id} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description_id">Description</Label>
                                <textarea
                                    id="description"
                                    tabIndex={5}
                                    autoComplete="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    disabled={processing}
                                    placeholder="add some description about the product"
                                    className="rounded-md border bg-white p-4 dark:border-white dark:bg-slate-900"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="currency_id">Category</Label>
                                <select
                                    tabIndex={1}
                                    name="category_id"
                                    id="cateogry_id"
                                    onChange={(e) => setData('category_id', Number(e.target.value))}
                                    className="rounded-md border border-gray-300 p-2"
                                >
                                    <option value="" className="text-gray-400 dark:bg-slate-800">
                                        Select Category...
                                    </option>
                                    {categories.map((category) => (
                                        <option value={category.id} className="dark:bg-slate-800">
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id} />
                            </div>

                            {/* <div className="grid gap-2">
                                <Label htmlFor="product_image">Product Images</Label>
                                <Input
                                    multiple
                                    id="product_image"
                                    type="file"
                                    required
                                    tabIndex={4}
                                    onChange={(e) => setData('product_images', e.target.files)}
                                    disabled={processing}
                                    // value={undefined}
                                />
                                <InputError message={errors.product_images} />
                            </div> */}

                            <div className="mt-2 grid gap-2">
                                <Label htmlFor="featured" title="this mean if set it to yes the product will also be shown the home page">
                                    is Featured
                                </Label>
                                <fieldset id="featured" className="my-2 flex gap-2">
                                    <div className="flex gap-x-2">
                                        <Label htmlFor="yes">Yes</Label>
                                        <input
                                            type="radio"
                                            name="is_featured"
                                            onChange={() => setData('is_featured', true)}
                                            value={'true'}
                                            id="yes"
                                        />
                                    </div>
                                    <div className="flex gap-x-2">
                                        <Label htmlFor="no">No</Label>
                                        <input
                                            type="radio"
                                            name="is_featured"
                                            onChange={() => setData('is_featured', false)}
                                            value={'false'}
                                            id="no"
                                        />
                                    </div>
                                </fieldset>
                                <InputError message={errors.is_featured} />
                            </div>

                            <Button type="submit" className="mt-2 w-full font-bold" tabIndex={8} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Add Product
                            </Button>
                        </div>
                    </div>
                </form>
            </Section>
        </AppLayout>
    );
};

export default Index;
