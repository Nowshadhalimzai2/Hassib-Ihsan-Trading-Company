import TransactionRecordList from '@/components/Transactions/TransactionRecordList';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vendor',
        href: '/vendor/dashboard',
    },
];

interface ProductProps {
    name: string;
    unit_price: number;
    quantity_in_stock: number;
    description: string;
    currency_id: number;
    created_at: Date;
}
export default function Dashboard({ products }: { products: ProductProps[] }) {
    const currencies = usePage().props.sumByCurrency as { Afg: number; Pak?: number; USD?: number };
    const user = usePage().props.user as User;
    const transactions = [...(user.transactions_as_source || []), ...(user.transactions_as_destination || [])];
    const auth_user = usePage().props.auth as { user: User };
    // calculate total price of products sold by vendor group by currency
    const calculateProductTotalPrice = (products: ProductProps[]): [number, number, number] => {
        let afgTotal = 0;
        let pakTotal = 0;
        let usdTotal = 0;
        products.forEach((product) => {
            if (product.currency_id === 1) {
                afgTotal += product.unit_price * product.quantity_in_stock;
            } else if (product.currency_id === 2) {
                pakTotal += product.unit_price * product.quantity_in_stock;
            } else if (product.currency_id === 3) {
                usdTotal += product.unit_price * product.quantity_in_stock;
            }
        });
        return [afgTotal, pakTotal, usdTotal];
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vendor Transactions" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div
                        title="#01"
                        className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-blue-50 pt-6 duration-300 hover:scale-103 hover:bg-blue-100 hover:shadow-lg"
                    >
                        <h2 className="my-2 text-center text-2xl font-semibold">Balance Afg</h2>
                        <p className="text-center text-xl font-semibold">
                            {(currencies.Afg ? currencies.Afg : 0) + calculateProductTotalPrice(products)[0]}
                        </p>
                    </div>

                    <div
                        title="#02"
                        className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-yellow-50 pt-6 duration-300 hover:scale-103 hover:bg-yellow-100 hover:shadow-lg"
                    >
                        <h2 className="my-2 text-center text-2xl font-semibold">Balance Pak</h2>
                        <p className="text-center text-xl font-semibold">
                            {(currencies.Pak ? currencies.Pak : 0) + calculateProductTotalPrice(products)[1]}
                        </p>
                    </div>
                    <div
                        title="#03"
                        className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-cyan-50 pt-6 duration-300 hover:scale-103 hover:bg-cyan-100 hover:shadow-lg"
                    >
                        <h2 className="my-2 text-center text-2xl font-semibold">Balance USD</h2>
                        <p className="text-center text-xl font-semibold">
                            {(currencies.USD ? currencies.USD : 0) + calculateProductTotalPrice(products)[2]}
                        </p>
                    </div>
                </div>
                <div
                    title="#04"
                    className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min"
                >
                    <TransactionRecordList className="mt-6" transactions={transactions} auth_user={auth_user.user} />
                    {products.map((product, index) => {
                        return (
                            <a href={`#`} className="" key={index}>
                                <div
                                    className={`mx-2 mt-1 flex w-full justify-between bg-green-50 px-4 py-3 transition-all duration-300 hover:scale-101 hover:bg-green-100 hover:shadow-lg`}
                                >
                                    <span>{product.unit_price * product.quantity_in_stock}</span>
                                    <span>{product.currency_id == 1 ? 'Afg' : product.currency_id == 2 ? 'Pak' : 'USD'}</span>
                                    <span>...{product?.description}</span>
                                    <span>{new Date(product.created_at).toLocaleDateString()}</span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
