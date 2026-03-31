import BalanceCard from '@/components/admin/BalanceCard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/Dashboard',
    },
];

export default function Dashboard({ curs }: { curs: { Afg?: number; Pak?: number; USD?: number } }) {
    // const { Afg, Pak, USD } = curs;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex min-h-full flex-col gap-4 rounded-xl p-4">
                <span className="w-full rounded-sm border border-lime-400 bg-lime-500/10 p-3 text-center text-2xl font-bold text-lime-400">
                    Balance
                </span>

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <BalanceCard curs={curs} currency="AFG" />
                    <BalanceCard curs={curs} currency="PKR" />
                    <BalanceCard curs={curs} currency="USD" />
                </div>

                <span className="w-full rounded-sm border border-lime-400 bg-lime-500/10 p-3 text-center text-2xl font-bold text-lime-400">
                    Orders
                </span>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div
                        title="Order Card"
                        className={`relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-amber-300 bg-amber-500/10 text-amber-400 duration-300 hover:scale-103 hover:bg-amber-500/20 hover:shadow-lg dark:text-amber-300`}
                    >
                        <h2 className="my-2 text-center text-lg font-semibold text-amber-300 md:text-xl dark:text-amber-400">Ordres Received</h2>
                        <p className="text-center text-xl font-semibold lg:text-2xl">200</p>
                    </div>

                    <div
                        title="Order Card"
                        className={`relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-amber-300 bg-amber-500/10 text-amber-400 duration-300 hover:scale-103 hover:bg-amber-500/20 hover:shadow-lg dark:text-amber-300`}
                    >
                        <h2 className="my-2 text-center text-lg font-semibold text-amber-300 md:text-xl dark:text-amber-400">Orders Succeed</h2>
                        <p className="text-center text-xl font-semibold lg:text-2xl">134</p>
                    </div>
                    <div
                        title="Order Card"
                        className={`relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-amber-300 bg-amber-500/10 text-amber-400 duration-300 hover:scale-103 hover:bg-amber-500/20 hover:shadow-lg dark:text-amber-300`}
                    >
                        <h2 className="my-2 text-center text-lg font-semibold text-amber-300 md:text-xl dark:text-amber-400">Orders Canceled</h2>
                        <p className="text-center text-xl font-semibold lg:text-2xl">66</p>
                    </div>

                     <div
                        title="Order Card"
                        className={`relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-amber-300 bg-amber-500/10 text-amber-400 duration-300 hover:scale-103 hover:bg-amber-500/20 hover:shadow-lg dark:text-amber-300`}
                    >
                        <h2 className="my-2 text-center text-lg font-semibold text-amber-300 md:text-xl dark:text-amber-400">Orders Pending</h2>
                        <p className="text-center text-xl font-semibold lg:text-2xl">6</p>
                    </div>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border"></div>
            </div>
        </AppLayout>
    );
}
