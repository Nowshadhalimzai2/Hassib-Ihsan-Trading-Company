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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <span className="w-full rounded-sm border border-lime-400 bg-lime-500/10 p-3 text-center text-2xl font-bold text-lime-400">
                    Balance
                </span>

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <BalanceCard curs={curs} currency="AFG" />
                    <BalanceCard curs={curs} currency="PKR" />
                    <BalanceCard curs={curs} currency="USD" />
                </div>

                <div
                    title="#04"
                    className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min"
                >
                    {/* <TransactionRecordList auth_user={auth_user.user} className="mt-6" transactions={transactions} /> */}
                </div>
            </div>
        </AppLayout>
    );
}
